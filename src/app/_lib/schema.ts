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
  service_price: z.string({
    required_error:
      "Service price is required. Please enter a valid price for your service",
  }),
});
