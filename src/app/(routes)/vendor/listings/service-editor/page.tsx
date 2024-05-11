import { serviceCategories } from "@/lib/service-categories";
import { CreateListingForm } from "@/listings/service-editor/create-listing-form";
import { ServiceEditorHeader } from "@/listings/service-editor/service-editor-header";
import { type SwellResponse } from "@/types/index";


interface Category {
  name: string;
  active: boolean;
  sorting: null;
  images: null;
  description: string;
  meta_title: null;
  meta_description: null;
  parent_id: null;
  slug: string;
  top_id: null;
  date_created: string;
  id: string;
}

export default async function ServiceEditor() {
  const categories: SwellResponse<Category> | { message: string } =
    await serviceCategories();

  if ("message" in categories) {
    throw new Error(categories.message);
  }

  return (
    <main className="flex size-full flex-col py-6 dark:bg-neutral-900 lg:pl-72">
      <ServiceEditorHeader />
      <div className="px-6 py-12 dark:bg-neutral-900 lg:px-8">
        <CreateListingForm categories={categories?.results} />
      </div>
    </main>
  );
}
