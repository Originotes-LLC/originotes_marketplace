import { PhotoIcon } from "@heroicons/react/24/outline";

export const ListingFileUploader = () => {
  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-neutral-900"
      >
        Photos
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-neutral-900/25 px-6 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto size-12 text-neutral-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-neutral-600">
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
          <p className="text-xs leading-5 text-neutral-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        Showcase your service with a cover photo. PNG, JPG, GIF up
        to 10MB.
      </p>
    </div>
  )
}