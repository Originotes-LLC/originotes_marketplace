import { z } from "zod";

export const ServiceListingSchema = z.object({
  service_name: z.string(),
  service_description: z.string(),
  service_file_upload: z.instanceof(File),
  service_price: z.number(),
});
