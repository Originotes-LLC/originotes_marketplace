import swell from "@/lib/server";
import { type Vendor } from "@/types/index";
import { getErrorMessage } from "@/utils/get-error-message";
import "server-only";

type CurrentVendor = {
  count: number;
  page_count: number;
  page: number;
  results: Vendor[];
};

export const getAccountByClerkId = async (
  clerkId: string | undefined
): Promise<CurrentVendor | { message: string } | Error> => {
  if (!clerkId) {
    throw new Error("clerkId is required.");
  }
  try {
    const currentVendor: CurrentVendor = await swell.get("/accounts", {
      clerk_id: clerkId,
    });

    return currentVendor;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    const unknownError = getErrorMessage(error);
    return {
      message: unknownError,
    };
  }
};
