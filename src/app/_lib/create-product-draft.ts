import "server-only";

import type { Product } from "@/types/index";
import swell from "@/lib/server";

export const createProductDraft = async (productData: Product) => {
  const res = await swell.post("/products", {
    name: productData.name,
    price: productData.price,
    description: productData.description,
    images: productData.images,
    active: productData.active,
    type: productData.type,
    vendor_id: productData.vendor_id,
  });

  return res;
};
