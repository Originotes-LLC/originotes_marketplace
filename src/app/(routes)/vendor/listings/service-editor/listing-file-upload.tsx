import { PhotoIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
type EnhancedFile = File & { preview: string };

//
export function ListingFileUpload({ fileFormRef }: { fileFormRef: any }) {
  const [files, setFiles] = useState<EnhancedFile[]>([]);
  console.log("files: ", files);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <>
      <input {...fileFormRef} type="hidden" name="service_files" value={JSON.stringify(files)} className="sr-only" />
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-neutral-900 dark:text-background"
        >
          Photos and video
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
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold text-fuchsia-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-fuchsia-600 focus-within:ring-offset-2 hover:text-fuchsia-500"
              >
                <span>Upload a picture</span>
                <input
                  {...getInputProps()}
                  id="file-upload-react"
                  name="file-upload-react"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">&nbsp;or drag and drop</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-neutral-600 dark:text-neutral-200">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
