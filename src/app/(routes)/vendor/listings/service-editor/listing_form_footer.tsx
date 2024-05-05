"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

export const ListingFormFooter = () => {
  const { pending } = useFormStatus();
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800">
      <div className="overflow-hidden p-8 lg:pl-72">
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
              pending
                ? "hidden w-full rounded-full bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 shadow-sm md:inline-block md:w-fit"
                : "hidden w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 transition-all duration-100 ease-in hover:scale-110 hover:bg-neutral-50 md:inline-block md:w-fit"
            }
          >
            Preview
          </button>
          <button
            disabled={pending}
            type="submit"
            className={
              pending
                ? "w-full rounded-full bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 shadow-sm md:w-fit"
                : "w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 transition-all duration-100 ease-in hover:scale-110 hover:bg-neutral-50 md:w-fit"
            }
          >
            {pending ? "Saving..." : "Save as draft"}
          </button>
          <button
            type="button"
            className={
              pending
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
