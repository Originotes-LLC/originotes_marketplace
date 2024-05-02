import { CreateListingForm } from "@/listings/service-editor/create-listing-form";
import { ServiceEditorHeader } from "@/listings/service-editor/service-editor-header";
function ServiceEditor() {
  return (
    <main className="flex size-full flex-col py-6 lg:pl-72">
      <ServiceEditorHeader />
      <div className="mx-auto max-w-7xl grow px-6 py-12 lg:px-8 ">
        <CreateListingForm />
      </div>
    </main>
  );
}

export default ServiceEditor;
