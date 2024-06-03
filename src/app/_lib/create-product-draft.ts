import "server-only";

import type { Product } from "@/types/index";
import swell from "@/lib/server";

export const createProductDraft = async (productData: Product) => {
  const res = await swell.post("/products", {
    name: productData.name,
    price: productData.price,
    description: productData.description,
    active: productData.active,
    virtual: true,
    vendor_id: productData.vendor_id,
    content: {
      s3files_id: productData.content.s3files_id,
    },
  });

  return res;
};
