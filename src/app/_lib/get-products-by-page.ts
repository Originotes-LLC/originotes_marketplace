import "server-only";

import type { ProductsPerPage } from "@/types/index";
import { getErrorMessage } from "@/utils/get-error-message";
import swell from "@/lib/server";

export const getProductsByPage = async (
  page: number,
  id: string
): Promise<ProductsPerPage | { message: string }> => {
  if (isNaN(page) || page < 1) getErrorMessage("Invalid page number provided.");
  if (!id) getErrorMessage("vendorId is required.");

  try {
    const products = await swell.get("/products", {
      where: {
        vendor_id: id,
      },
      // TODO: Make sure you increase the limit to like 10 or 20 later per page
      limit: 6,
      page,
      include: {
        categories: {
          url: "/categories",
          params: {
            id: { $in: "category_index.id" },
          },
          data: {
            fields: ["name", "parent.name"],
          },
        },
      },
    });
    return products;
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
