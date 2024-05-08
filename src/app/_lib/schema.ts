import { z } from "zod";
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];
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
  service_price: z.string({
    required_error:
      "Service price is required. Please enter a valid price for your service",
  }),
  service_files: z.any().refine((file: string) => {
    return true;
  }, "Please update or add new image."),

  // .refine((file) => {
  //   console.log("does these files get accepted in the backend?: ", file);
  //   return ACCEPTED_IMAGE_TYPES.includes(file?.type);
  // }, ".jpg, .jpeg, .png and .webp files are accepted."),
});
