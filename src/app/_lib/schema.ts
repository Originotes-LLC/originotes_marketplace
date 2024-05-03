import { z } from "zod";

export const ServiceListingSchema = z.object({
  service_name: z
    .string()
    .min(3, "Service name must be at least 3 characters")
    .max(20, "Service name must be at most 20 characters"),
  service_description: z
    .string()
    .min(10, "Service description must be at least 10 characters"),
  service_category: z.string(),
  // service_file_upload: z.instanceof(File),
  service_price: z.string(),
});
