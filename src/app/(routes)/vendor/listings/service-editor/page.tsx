import { CreateListingForm } from "@/listings/service-editor/create-listing-form";
import { ServiceEditorHeader } from "@/listings/service-editor/service-editor-header";
function ServiceEditor() {
  return (
    <main className="flex size-full flex-col py-6 dark:bg-neutral-900 lg:pl-72">
      <ServiceEditorHeader />
      <div className="px-6 py-12 dark:bg-neutral-900 lg:px-8">
        <CreateListingForm />
      </div>
    </main>
  );
}

export default ServiceEditor;
