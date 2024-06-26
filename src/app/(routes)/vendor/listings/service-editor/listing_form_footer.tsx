/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import type { FieldErrors } from "react-hook-form";
import Link from "next/link";
import { ServiceListingSchema } from "@/lib/schema";
import { useFormStatus } from "react-dom";
import { z } from "zod";

export const ListingFormFooter = ({
  isUploading,
  clientErrors,
  serverErrors,
}: {
  isUploading: boolean;
  clientErrors: FieldErrors<z.infer<typeof ServiceListingSchema>>;
  // TODO: Fix the type of serverErrors
  serverErrors: any
}) => {
  const fieldWithError = (error: string) => {
    switch (error) {
      case "service_name":
        return "Name";
      case "service_description":
        return "Description";
      case "service_category":
        return "Category";
      case "service_price":
        return "Price";
      case "uploaded_service_files":
        return "Photos";
      default:
        return "Unknown field";
    }
  };

  const { pending } = useFormStatus();

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800">
      <div className="overflow-hidden p-8 lg:pl-72">
        <div className="mb-6 flex flex-col items-center md:ml-12 md:block">
          {(serverErrors && Object.keys(serverErrors).length > 0 ||
            Object.keys(clientErrors).length > 0) && (
              <p className="text-center text-base font-medium text-red-500 md:text-left">
                Fix the errors highlighted to save your changes:
              </p>
            )}
          <div className="flex flex-wrap space-x-2">
            {clientErrors && Object.keys(clientErrors).length > 0 && (
              <ul className="mt-2 flex space-x-4">
                {Object.keys(clientErrors).map((error) => (
                  <li
                    key={error}
                    className="text-foreground text-center text-base underline dark:text-white"
                  >
                    <Link href={`#${error}`}>{fieldWithError(error)}</Link>
                  </li>
                ))}
              </ul>
            )}
            {serverErrors && Object.keys(serverErrors).length > 0 && (
              <ul className="mt-2 flex space-x-4">
                {Object.keys(serverErrors).map((error) => (
                  <li
                    key={error}
                    className="text-foreground text-center text-base underline dark:text-white"
                  >
                    <Link href={`#${error}`}>{fieldWithError(error)}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-6 md:flex-row md:justify-end md:space-x-6 md:space-y-0">
          <Link
            href="/vendor/listings?page=1"
            className="w-full rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-200 md:w-fit"
          >
            Cancel
          </Link>

          <button
            type="button"
            className={
              pending || isUploading
                ? "hidden w-full rounded-full bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 shadow-sm md:inline-block md:w-fit"
                : "hidden w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 transition-all duration-100 ease-in hover:scale-110 hover:bg-neutral-50 md:inline-block md:w-fit"
            }
          >
            Preview
          </button>
          <button
            disabled={pending || isUploading}
            type="submit"
            className={
              pending || isUploading
                ? "w-full rounded-full bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 shadow-sm md:w-fit"
                : "w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 transition-all duration-100 ease-in hover:scale-110 hover:bg-neutral-50 md:w-fit"
            }
          >
            {pending || isUploading ? "Saving..." : "Save as draft"}
          </button>
          <button
            type="button"
            className={
              pending || isUploading
                ? "w-full rounded-full bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 shadow-sm md:w-fit"
                : "w-full rounded-full bg-fuchsia-100 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-fuchsia-300 transition-all duration-100 ease-in hover:scale-110 hover:bg-fuchsia-500 hover:text-white md:w-fit"
            }
          >
            Publish
          </button>
        </div>
      </div>
    </footer>
  );
};
