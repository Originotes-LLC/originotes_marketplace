"use server";

import { ServiceListingSchema } from "@/lib/schema";

export const submitNewService = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log("data received on server side: ", data);
  const parsed = await ServiceListingSchema.safeParseAsync(data);
  if (!parsed.success) {
    return {
      message: "Invalid form data",
      issues: parsed.error.format(),
    };
  }

  // here we still need to validate the files as valid File objects

  return {
    message: "Success",
    issues: {},
  };
};

// write a function to simulate 3 seconds of wait time to test submission buttons
// const wait = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));
// await wait(3000);
