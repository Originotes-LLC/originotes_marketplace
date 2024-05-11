import { PhotoIcon } from "@heroicons/react/24/solid";

//
export function ListingFileUpload({ formFiles, getRootProps, getInputProps, hiddenFormFiles }: {
  formFiles: any;
  getRootProps: any;
  getInputProps: any;
  hiddenFormFiles: any

}) {


  return (
    <>
      <input {...hiddenFormFiles} name="service_files" type="hidden" value={JSON.stringify(formFiles)} className="sr-only" />
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-neutral-900 dark:text-background"
        >
          Photos and video <span className="font-light">&nbsp;(You can upload up to 9 images and 1 video).</span>
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-neutral-900/25 px-6 py-10 dark:border-neutral-50">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto size-12 text-neutral-300"
              aria-hidden="true"
            />
            <div
              {...getRootProps()}
              className="mt-4 flex text-sm leading-6 text-neutral-600 dark:text-neutral-50"
            >
              <label
                htmlFor="image_file_input_react"
                className="relative cursor-pointer rounded-md font-semibold text-fuchsia-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-fuchsia-600 focus-within:ring-offset-2 hover:text-fuchsia-500"
              >
                <span>Upload file</span>
                <input
                  {...getInputProps()}
                  id="image_file_input_react"
                  name="image_file_input_react"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">&nbsp;or drag and drop</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-neutral-600 dark:text-neutral-200">
              PNG, JPG, MP4, JPEG and more are accepted
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
