import "server-only";

import swell from "@/lib/server";
import type { Product } from "@/types/index";

export const createProductDraft = async (productData: Product) => {
  const res = await swell.post("/products", {
    name: productData.name,
    price: productData.price,
    description: productData.description,
    active: productData.active,
    virtual: true,
    vendor_id: productData.vendor_id,
  });

  return res;
};
