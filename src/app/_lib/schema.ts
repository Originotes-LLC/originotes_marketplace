import { z } from "zod";

export const ServiceListingSchema = z.object({
  service_name: z
    .string()
    .min(3, "Service name must be at least 3 characters")
    .max(100, "Service name must be at most 100 characters"),
  service_description: z
    .string()
    .min(10, "Service description must be at least 10 characters")
    .max(500, "Service description must be at most 500 characters"),
  service_category: z.string({
    required_error:
      "Service category is required. Please select a category for your service",
  }),
  service_price: z.string({
    required_error:
      "Service price is required. Please enter a valid price for your service",
  }),
  service_files: z.any().transform((str, ctx) => {
    try {
      const parsedFiles: File[] = JSON.parse(str);
      // we need to account for server side where Window is not defined so we cannot validate instanceof File because it doesn't exist on the server

      if (typeof window === "undefined") {
        //  validate Files server side
        return parsedFiles.every(
          (file) =>
            Object.prototype.hasOwnProperty.call(file, "preview") &&
            Object.prototype.hasOwnProperty.call(file, "path")
        );
      } else {
        // validate Files client side
        return parsedFiles.every((file) => file instanceof File);
      }
    } catch (e) {
      console.log("Error parsing files: ", e);
      if (e instanceof Error) {
        ctx.addIssue({
          code: "custom",
          message: e.message,
        });
        return z.NEVER;
      } else {
        ctx.addIssue({
          code: "custom",
          message: `Error parsing files: ${JSON.stringify(e)}`,
        });
        return z.NEVER;
      }
    }
  }),
});
