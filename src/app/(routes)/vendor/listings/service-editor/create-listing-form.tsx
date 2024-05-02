import { ListingFormFooter } from "@/listings/service-editor/listing_form_footer";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ServiceCategories } from "@/components/select_menu";
import { submitNewService } from "@/vendor/actions";
/*

Fields needed to create a service

- Service name
- Type : Digital (hidden or set in the server action directly)
- Category (selected from a list of categories)
- Vendor  (set directly in the server action)
- Media (passing image Files)
- Standard Pricing (list price, sale price, currency)
- Options (list of options like add-ons of type toggle )
- Service Description (content)
*/
export const CreateListingForm = () => {
  return (
    <form action={submitNewService} className="relative space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Service Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Tell your customers about your service details. Be as creative as
            you want with the name and description.
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="service_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span> */}
                    <input
                      type="text"
                      name="service_name"
                      id="service_name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="e.g. proposal, magic elopement, date-night-in-i-box"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="service_description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="service_description"
                    name="service_description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Elaborate what your service will provide if users were to
                  purchase it. Buyers will only see the first few lines unless
                  they expand the description.
                </p>
              </div>

              {/* CATEGORIES */}
              <div className="mt-6 sm:col-span-full">
                <ServiceCategories />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photos
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto size-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="service_file_upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-fuchsia-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-fuchsia-600 focus-within:ring-offset-2 hover:text-fuchsia-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="service_file_upload"
                          name="service_file_upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Showcase your service with a cover photo. PNG, JPG, GIF up to
                  10MB.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING SECTION */}
      <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Pricing & Inventory
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Set the price and availability of your service.
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="max-w-2xl space-y-10">
              <div>
                <label
                  htmlFor="service_price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="service_price"
                    id="service_price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 pb-32 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add-Ons
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add optional items to your service to increase its value. For example, musician, champagne, or a photographer.
          </p>
        </div>

        {/* VARIATIONS AKA ADD-ONS SECTION */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="w-full pr-2">
                <label
                  htmlFor="add-on-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Add-on Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span> */}
                    <input
                      type="text"
                      name="add-on-name"
                      id="add-on-name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="e.g. musician, champagne, photographer"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full pl-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Add Add-On
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0">
        <ListingFormFooter />
      </div>
    </form>
  );
};
