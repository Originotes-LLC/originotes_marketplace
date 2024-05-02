"use server";

import { ServiceListingSchema } from "@/lib/schema";

export const submitNewService = async (formData: FormData) => {
  // write a function to simulate 3 seconds of wait time to test submission buttons
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await wait(3000);
  try {
    const name = formData.get("service_name");
    const description = formData.get("service_description");
    const file = formData.get("service_file_upload");
    const price = parseFloat(formData.get("service_price") as string);

    // Validate the form data
    const validatedFields = ServiceListingSchema.safeParse({
      service_name: name,
      service_description: description,
      service_file_upload: file,
      service_price: price,
    });

    console.log("validatedFields: ", JSON.stringify(validatedFields, null, 2));

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
  } catch (error) {
    return {
      errors: error,
    };
  }
};
