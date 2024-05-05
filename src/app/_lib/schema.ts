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
  service_category: z.string(),
  // service_file_upload: z.instanceof(File),
  service_price: z
    .number({
      required_error:
        "What you have entered does not look like a price number. Please enter a valid price.",
      invalid_type_error: "The service price must be a number",
    })
    .refine((x) => Math.abs(Math.round(x * 100) - x * 100) < 0.01, {
      message: "The service price must have at most two decimal places",
    }),
});
