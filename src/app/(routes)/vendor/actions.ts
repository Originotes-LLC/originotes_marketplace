"use server";

import type { CustomSwellFile, S3File } from "@/types/index";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { ServiceListingSchema } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { createProductDraft } from "@/lib/create-product-draft";
import { getAccountByClerkId } from "@/lib/get-account-by-clerk-id";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import swell from "@/lib/server";
import { v4 as uuidv4 } from "uuid";

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
  console.log("parsed: ", parsed);

  if (!parsed.success) {
    return {
      status: 400,
      message:
        "Mmm, something went wrong. Please check the form and try fixing the issues.",
      issues: parsed.error.format(),
    };
  }

  const uploadedFilesIds: string[] | [] = parsed?.data?.uploaded_service_files
    ? JSON.parse(parsed.data.uploaded_service_files).map(
        (file: CustomSwellFile) => file.id
      )
    : [];

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
      vendor_id: id,
      active: true,
      s3files_id: uploadedFilesIds,
    });

    if ("errors" in serviceDraft) {
      return {
        status: 400,
        message: "Error from server action",
        issues: {
          error: JSON.stringify(serviceDraft.errors, null, 2),
        },
      };
    } else {
      revalidatePath("/vendor/listings?page=1");
      return {
        status: 200,
        message: "Message draft saved successfully.",
        issues: {},
      };
    }
  }
  return {
    status: 400,
    message: "Invalid user",
  };
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // maximum file size  5MB in bytes
const MAX_FILES = 10; // Max number of files to upload

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFilesToAmazonS3(formData: FormData | Error) {
  if (formData instanceof Error) {
    return [
      createFileErrorResponse(400, "Invalid form data", {
        service_image_file: "Please select valid photos.",
      }),
    ];
  }
  const files = formData.getAll("files") as File[];

  if (files.length === 0) {
    return [
      createFileErrorResponse(400, "No files to upload", {
        service_image_file: "Please select at least one photo.",
      }),
    ];
  }

  if (files.length > MAX_FILES) {
    return [
      createFileErrorResponse(400, "Too many files", {
        service_image_file: `You can select up to ${MAX_FILES} photos.`,
      }),
    ];
  }

  const uploadPromises = files.map(async (file) => {
    if (!(file instanceof File)) {
      return createFileErrorResponse(400, "Invalid file type", {
        service_image_file: "Please select valid photos.",
      });
    }
    if (file.size > MAX_FILE_SIZE) {
      return createFileErrorResponse(
        400,
        `File ${file.name} exceeds the maximum size of 5MB.`,
        {
          service_image_file: `File ${file.name} exceeds the maximum size of 5MB.`,
        }
      );
    }

    try {
      // Convert the File to a Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Use Sharp to process the image and get the resized dimensions
      const image = sharp(buffer);
      const resizedImage = image.resize({
        width: 2000,
        withoutEnlargement: true,
      });
      const optimizedBuffer = await resizedImage
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();
      const metadata = await resizedImage.metadata();

      // Use resized dimensions for metadata that can be saved in S3
      const width = metadata.width ?? 2000;
      const height =
        metadata.height ??
        Math.round((metadata?.height! * 2000) / metadata?.width!);

      const bucket =
        process.env.NODE_ENV === "development"
          ? process.env.AWS_DEV_BUCKET_NAME!
          : process.env.AWS_PROD_BUCKET_NAME!;
      const key = `${uuidv4()}.jpeg`; // Use .jpeg extension for the processed file
      const uploadParams = {
        Bucket: bucket,
        Key: key,
        Body: optimizedBuffer,
        ContentType: "image/jpeg",
        Metadata: {
          width: width.toString(),
          height: height.toString(),
        },
      };
      const response = await s3Client.send(new PutObjectCommand(uploadParams));

      if (response.$metadata.httpStatusCode === 200) {
        return {
          status: 200,
          message: "File successfully uploaded",
          data: {
            url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
            width,
            height,
          },
        };
      } else {
        return createFileErrorResponse(
          500,
          `Failed to upload file ${file.name}`,
          {
            service_image_file: `Failed to upload file ${file.name}.`,
          }
        );
      }
    } catch (error) {
      // console.error(`Failed to upload file ${file.name}:`, error);
      return createFileErrorResponse(
        500,
        `Failed to upload file ${file.name}`,
        {
          service_image_file: `Failed to upload file ${file.name}.`,
        }
      );
    }
  });

  try {
    return await Promise.all(uploadPromises);
  } catch (error) {
    // console.error("Error during file upload process:", error);
    return [
      createFileErrorResponse(500, "Failed to upload files", {
        service_image_file: "Failed to upload files.",
      }),
    ];
  }
}

function createFileErrorResponse(
  status: number,
  message: string,
  issues: { [key: string]: string }
) {
  return {
    status,
    message,
    data: {
      url: null,
      width: 0,
      height: 0,
    },
    issues,
  };
}

export const saveUploadedFilesInSwell = async (
  formData: FormData | Error
): Promise<Error | CustomSwellFile[]> => {
  if (formData instanceof Error) {
    throw new Error("Invalid form data");
  }
  const parsedFiles = formData.getAll("files");
  const deSerializedFiles = parsedFiles.map((file) =>
    JSON.parse(file as string)
  );

  try {
    const filesSavedInSwell = await Promise.all(
      deSerializedFiles.map(async (file: S3File) => {
        if (file.status === 200) {
          const res = await swell.post("/content/s-3-file", {
            url: file.data.url,
            width: file.data.width,
            height: file.data.height,
          });
          return res;
        } else {
          return file;
        }
      })
    );

    return filesSavedInSwell;
  } catch (error) {
    console.log("error trying to save s3 files in swell: ", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An error occurred while saving the files in Swell");
    }
  }
};
