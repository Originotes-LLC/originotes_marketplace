import { z } from "zod";

// const UploadedFilesSchema = z
//   .array(
//     z.object({
//       status: z.number(),
//       message: z.string(),
//       data: z.object({
//         url: z.string(),
//         width: z.number(),
//         height: z.number(),
//       }),
//     })
//   )
//   .nonempty();

// interface UploadedFiles<T> {
//   status: number;
//   message: string;
//   data: T;
// }

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
      required_error: "Category is required. Please select a category.",
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
  uploaded_service_files: z.string().transform((val, ctx) => {
    try {
      const parsedUploadedFiles = JSON.parse(val);
      console.log(
        "parsedUploadedFiles in Services schema: ",
        parsedUploadedFiles
      );

      if (!Array.isArray(parsedUploadedFiles)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid file format",
        });
        return z.NEVER;
      }

      if (parsedUploadedFiles.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please upload at least one file",
        });
        return z.NEVER;
      }

      return val;
    } catch (error) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Something went wrong. We were unable to get the submitted files. Please try again or contact support if the issue persists.",
      });
    }
  }),
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
      if (num <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price must be greater than zero and a positive number",
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
