import "server-only";

import swell from "@/lib/server";

type Vendor = {
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  email_optin: boolean;
  group: string;
  currency: string;
  name: string;
  date_created: string;
  type: "individual" | "company";
  order_count: number;
  order_value: number;
  balance: number;
  id: string;
};

type CurrentVendor = {
  count: number;
  page_count: number;
  page: number;
  results: Vendor[];
};

export const getServicesByVendorId = async (
  clerkId: string | undefined,
  page: number
) => {
  try {
    // check if the page is a Number and if it's 1 or greater
    if (isNaN(page) || page < 1)
      throw new Error(
        "The page number you are trying to access is invalid. Please provide a valid page number."
      );
    if (!clerkId) throw new Error("vendorId is required.");
    const currentVendor: CurrentVendor = await swell.get("/accounts", {
      clerk_id: clerkId,
    });

    if (!currentVendor)
      throw new Error("There has been an error fetching the vendor");

    const { count } = currentVendor;

    if (count === 1) {
      const { id } = currentVendor.results[0];
      try {
        const services = await swell.get("/products", {
          where: {
            content: {
              vendor_id: id,
            },
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
        return services;
      } catch (error) {
        console.log("error fetching services: ", error);
        if (error instanceof Error) {
          return { message: error.message, error };
        }
        return { message: "An error occurred while fetching services." };
      }
    } else {
      return {
        message: "Vendor not found",
        error: new Error("Vendor not found"),
      };
    }
  } catch (error) {
    console.log("error fetching vendor: ", error);
    if (error instanceof Error) {
      return { message: error.message, error };
    }
    return { message: "An error occurred while fetching vendor." };
  }
};
