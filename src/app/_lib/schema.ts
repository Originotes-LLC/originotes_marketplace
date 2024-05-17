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
  service_category: z
    .string({
      required_error:
        "Service category is required. Please select a category for your service",
    })
    .transform((val, ctx) => {
      if (val === "Select a category" || val.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select a valid category for your service",
        });
        return z.NEVER;
      }
      return val;
    }),
  service_image_file: z.any(),
  service_price: z
    .string({
      required_error: "Price is required. Please enter a valid price.",
    })
    .transform((val, ctx) => {
      const isAValidNumber = /^\d+$/.test(val);

      if (!isAValidNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid number.",
        });
        return z.NEVER;
      }
      const num = parseFloat(val);
      // check if the number is a positive number
      if (num < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price must be a positive number",
        });
        return z.NEVER;
      }

      // check if the number is bigger than the max javascript number
      if (num > Number.MAX_SAFE_INTEGER) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price is too large",
        });
        return z.NEVER;
      }

      return val;
    }),
});
