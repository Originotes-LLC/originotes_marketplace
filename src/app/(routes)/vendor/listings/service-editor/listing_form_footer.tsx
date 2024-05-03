"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

export const ListingFormFooter = () => {
  const { pending } = useFormStatus();
  return (
    <footer className="bg-white dark:bg-neutral-800">
      <div className="overflow-hidden p-8 pl-72">
        <div className="grid w-full justify-end space-x-2">
          <div className="space-x-6">
            <Link
              href="/vendor/listings?page=1"
              className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-200"
            >
              Cancel
            </Link>

            <button
              type="button"
              className={
                pending
                  ? "rounded-full bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 shadow-sm"
                  : "rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 transition-all duration-100 ease-in hover:scale-110 hover:bg-neutral-50"
              }
            >
              Preview
            </button>
            <button
              disabled={pending}
              type="submit"
              className={
                pending
                  ? "rounded-full bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 shadow-sm"
                  : "rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 transition-all duration-100 ease-in hover:scale-110 hover:bg-neutral-50"
              }
            >
              {pending ? "Saving..." : "Save as draft"}
            </button>
            <button
              type="button"
              className={
                pending
                  ? "rounded-full bg-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-500 shadow-sm"
                  : "rounded-full bg-fuchsia-100 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-fuchsia-300 transition-all duration-100 ease-in hover:scale-110 hover:bg-fuchsia-500 hover:text-white"
              }
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
