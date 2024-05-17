import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ExclamationCircleIcon, PhotoIcon } from "@heroicons/react/24/solid";
import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

import type { ServiceListingSchema } from "@/lib/schema";
import { Label } from "@radix-ui/react-label";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

/* eslint-disable tailwindcss/no-custom-classname */
//
export function ListingFileUpload({
  getRootProps,
  getInputProps,
  form,
  serverErrors,
}: {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  form: UseFormReturn<z.infer<typeof ServiceListingSchema>>;
  serverErrors: {
    [key: string]: string;
  }
}) {
  return (
    <>
      <div className="col-span-full">
        <FormField
          name="service_image_file"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label className="dark:text-background" htmlFor="service_image_file">
                Photos
              </Label>
              <FormDescription className="dark:text-neutral-200">
                You can upload up to 10 images.
              </FormDescription>

              <FormControl {...getRootProps()}>
                <div className={(serverErrors?.service_image_file) ? "flex justify-center rounded-lg border-2 border-dashed border-red-500 px-6 py-10 dark:border-red-500" : "flex justify-center rounded-lg border border-dashed border-neutral-900/25 px-6 py-10 dark:border-neutral-50"}>
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto size-12 text-neutral-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-neutral-600 dark:text-neutral-50">
                      <label
                        htmlFor="service_image_file"
                        className="relative cursor-pointer rounded-md font-semibold text-fuchsia-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-fuchsia-600 focus-within:ring-offset-2 hover:text-fuchsia-500"
                      >
                        <span>Upload up to 10 images</span>
                        <input
                          {...field}
                          {...getInputProps()}
                          id="service_image_file"
                          name="service_image_file"
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

              </FormControl>
              <div className="flex items-center space-x-2">
                {(serverErrors?.service_image_file) && (
                  <ExclamationCircleIcon className="size-7 text-red-500" />
                )}
                {serverErrors?.service_image_file && (
                  <p className='text-destructive text-sm font-medium'>{serverErrors?.service_image_file}</p>
                )}
                <FormMessage className="text-sm" />
              </div>

            </FormItem>
          )}
        />

      </div>
    </>
  );
}
