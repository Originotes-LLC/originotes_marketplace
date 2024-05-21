import type { Category, SwellResponse } from "@/types/index";

import { CreateListingForm } from "@/listings/service-editor/create-listing-form";
import { ServiceEditorHeader } from "@/listings/service-editor/service-editor-header";
import { serviceCategories } from "@/lib/service-categories";

/* eslint-disable tailwindcss/no-custom-classname */



export default async function ServiceEditor() {
  const categories: SwellResponse<Category> | { message: string } =
    await serviceCategories();


  if ("message" in categories) {
    throw new Error(categories.message);
  }

  return (
    <main className="flex size-full flex-col py-6 lg:pl-72 dark:bg-neutral-900">
      <ServiceEditorHeader />
      <div className="px-6 py-12 lg:px-8 dark:bg-neutral-900">
        <CreateListingForm categories={categories?.results} />
      </div>
    </main>
  );
}
