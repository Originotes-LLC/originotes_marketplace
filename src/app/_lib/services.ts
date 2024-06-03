import "server-only";

import type {
  CustomSwellFile,
  ProductsPerPage,
  SwellResponse,
} from "@/types/index";

import { getAccountByClerkId } from "@/lib/get-account-by-clerk-id";
import { getErrorMessage } from "@/utils/get-error-message";
import { getProductsByPage } from "@/lib/get-products-by-page";
import { getS3Files } from "@/lib/getS3Files";

/*
  in case of an invalid PUT, POST, or DELETE request the Swell NODE library will return the SwellError type 
  for GET cases it will throw an Error. As a RULE OF THUMB, all Swell GET cases NEED to be wrapped in a try/catch block, see file service-categories.ts for an example
*/
export const getServicesByVendorId = async (
  clerkId: string | undefined,
  page: number,
): Promise<ProductsPerPage | { message: string }> => {
  // check if the page is a Number and if it's 1 or greater
  if (isNaN(page) || page < 1) getErrorMessage("Invalid page number provided.");

  if (!clerkId) getErrorMessage("vendorId is required.");

  try {
    // TODO: This should be replaced by the actual ID of the vendor in Swell, which you can probably get from the currently logged in user, aka sessions
    const currentVendor = await getAccountByClerkId(clerkId);

    if (currentVendor instanceof Error || "message" in currentVendor) {
      return {
        message: currentVendor.message,
      };
    }

    const { count } = currentVendor;
    if (count === 0) {
      return {
        message: "No vendor found with the provided clerk id",
      };
    }

    if (Array.isArray(currentVendor.results) && currentVendor.results[0]) {
      const { id } = currentVendor.results[0];

      try {
        const services = await getProductsByPage(page, id);

        if (services instanceof Error || "message" in services) {
          const unknownError = getErrorMessage(services.message);
          return {
            message: unknownError,
          };
        }
        // now get the S3 Images for each service
        for (const product of services.results) {
          if ("s3files_id" in product.content) {
            const s3Files: string | SwellResponse<CustomSwellFile> =
              await getS3Files(product.content.s3files_id);
            if (typeof s3Files === "string") {
              throw new Error(
                `Error getting the  requested S3 file: ${s3Files}`,
              );
            }
            for (const file of s3Files.results) {
              if (!product.s3Images) product.s3Images = [];
              product.s3Images.push(file);
            }
          }
        }

        return services;
      } catch (error) {
        if (error instanceof Error) {
          return {
            message: error.message,
          };
        }
        const unknownError = getErrorMessage(error);
        return {
          message: unknownError,
        };
      }
    } else {
      return {
        message: "No vendor found with the provided clerk id",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    const unknownError = getErrorMessage(error);
    return {
      message: unknownError,
    };
  }
};
