export const ListingHeader = () => {
  return (
    <div className="border-b border-gray-200 px-6 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-2xl font-semibold leading-6 text-gray-900">Service Listings</h3>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Create a service
        </button>
      </div>
    </div>
  )
}