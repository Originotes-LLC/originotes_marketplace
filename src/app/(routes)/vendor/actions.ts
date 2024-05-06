"use server";

import { ServiceListingSchema } from "@/lib/schema";
import { z } from "zod";

export const submitNewService = async (
  formData: z.infer<typeof ServiceListingSchema>
) => {
  // write a function to simulate 3 seconds of wait time to test submission buttons
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await wait(3000);
  try {
    // Validate the form data
    const validatedFields = ServiceListingSchema.safeParse(formData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields,
      };
    }

    // add to database
  } catch (error) {
    return {
      errors: error,
    };
  }
};
