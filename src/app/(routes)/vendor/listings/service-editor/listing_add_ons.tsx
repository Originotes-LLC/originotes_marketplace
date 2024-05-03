export const AddOns = () => {
  return (
    <div className="grid grid-cols-1 gap-8 pb-32 pt-10 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-neutral-900">
          Add-Ons
        </h2>
        <p className="mt-1 text-sm leading-6 text-neutral-600">
          Add optional items to your service to increase its value. For
          example, musician, champagne, or a photographer.
        </p>
      </div>

      {/* VARIATIONS AKA ADD-ONS SECTION */}
      <div className="bg-white shadow-sm ring-1 ring-neutral-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="w-full pr-2">
              <label
                htmlFor="add-on-name"
                className="block text-sm font-medium leading-6 text-neutral-900"
              >
                Add-on Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-neutral-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                  <input
                    type="text"
                    name="add-on-name"
                    id="add-on-name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="e.g. musician, champagne, photographer"
                  />
                </div>
              </div>
            </div>
            <div className="w-full pl-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-neutral-900"
              >
                Price
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-neutral-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-neutral-500 sm:text-sm"
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
              className="rounded-md bg-white px-3 py-2 text-sm font-normal text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50"
            >
              Add Add-On
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}