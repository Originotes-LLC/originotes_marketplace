"use server";

import { ServiceListingSchema } from "@/lib/schema";

export const submitNewService = async (prevState: any, formData: FormData) => {
  const files = formData.getAll("service_image_file");
  // console.log("files received server side: ", files);
  const areAllFilesValid = files.every(
    (file) => file instanceof File && file.name !== undefined && file.size > 0
  );
  if (!areAllFilesValid) {
    return {
      message: "Invalid file type",
      issues: {
        service_image_file:
          "Please select at least one photo. You can select up to 10 photos.",
      },
    };
  }
  const data = Object.fromEntries(formData);
  // console.log("data received on server side: ", data);

  const parsed = await ServiceListingSchema.safeParseAsync(data);
  if (!parsed.success) {
    return {
      message: "Invalid form data",
      issues: parsed.error.format(),
    };
  }

  // save the data in Swell
  return {
    message: "Success from server action. You can save the data now.",
    issues: {},
  };
};
