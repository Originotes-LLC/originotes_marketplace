import "server-only";

import swell from "@/lib/server";

export const getServicesByVendorId = async (
  clerkId: string | undefined,
  page: number
) => {
  if (!clerkId) throw new Error("vendorId is required");

  try {
    const currentVendor = await swell.get("/accounts", {
      clerk_id: clerkId,
    });

    if (!currentVendor)
      throw new Error("There has been an error fetching the vendor");
    const { id } = currentVendor.results[0];

    if (currentVendor.count === 0)
      throw new Error("No vendor found with the clerk id provided");

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

      if (services.count && services.count === 0)
        throw new Error("No services found for the vendor");
      return services;
    } catch (error) {
      // console.log(`error fetching services: ${JSON.stringify(error, null, 2)}`);
      return error;
    }
  } catch (error) {
    // console.log(`error fetching vendor: ${JSON.stringify(error, null, 2)}`);
    return error;
  }
};
