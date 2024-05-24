"use server";

import type { SwellError, SwellFile, SwellProductImage } from "@/types/index";

import { ServiceListingSchema } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { createProductDraft } from "@/lib/create-product-draft";
import { getAccountByClerkId } from "@/lib/get-account-by-clerk-id";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/upload-file";

export const submitNewService = async (prevState: any, formData: FormData) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error(
      "You must be signed in to perform this action. If this error persists please contact support."
    );
  }

  const loggedInSwellUser = await getAccountByClerkId(userId);

  const data = Object.fromEntries(formData);
  const parsed = await ServiceListingSchema.safeParseAsync(data);
  if (!parsed.success) {
    return {
      status: 400,
      code: "invalid-form-data",
      message: "Invalid form data",
      issues: parsed.error.format(),
    };
  }

  const parsedUploadedImages: SwellFile[] = JSON.parse(
    parsed.data.uploaded_service_files
  );
  const transformedImages: SwellProductImage[] = parsedUploadedImages.map(
    (img) => {
      return {
        file: img,
      };
    }
  );

  if (
    "count" in loggedInSwellUser &&
    loggedInSwellUser.count === 1 &&
    loggedInSwellUser.results.length === 1
  ) {
    const { id } = loggedInSwellUser?.results[0]!;
    // save the data in Swell
    const serviceDraft = await createProductDraft({
      name: parsed.data.service_name,
      price: Number(parsed.data.service_price),
      description: parsed.data.service_description,
      images: transformedImages,
      vendor_id: id,
      type: "digital",
      active: true,
    });

    if ("errors" in serviceDraft) {
      return {
        status: 400,
        code: "server-error",
        message: "Error from server action",
        issues: {
          error: JSON.stringify(serviceDraft.errors, null, 2),
        },
      };
    } else {
      revalidatePath("/vendor/listings?page=1");
      return {
        status: 200,
        code: "draft-saved",
        message: "Message draft saved successfully.",
        issues: {},
      };
    }
  }
  return {
    status: 400,
    code: "invalid-user",
    message: "Invalid user",
  };
};

export const saveAcceptedFiles = async (formData: FormData) => {
  const files = formData.getAll("service_image_file") as File[];

  if (files.length === 0) {
    return {
      status: 400,
      code: "no-files",
      message: "No files to upload",
      issues: {
        service_image_file: "Please select at least one photo.",
      },
    };
  }

  if (files.length > 10) {
    return {
      status: 400,
      code: "too-many-files",
      message: "Too many files",
      issues: {
        service_image_file: "You can select up to 10 photos.",
      },
    };
  }

  for (const file of files) {
    if (!(file instanceof File)) {
      return {
        status: 400,
        code: "invalid-file-type",
        message: "Invalid file type",
        issues: {
          service_image_file:
            "Please select at least one photo. You can select up to 10 photos.",
        },
      };
    }
  }

  const uploadedFiles: (SwellFile | undefined | null)[] | SwellError =
    await uploadFiles(files);
  return uploadedFiles;
};
