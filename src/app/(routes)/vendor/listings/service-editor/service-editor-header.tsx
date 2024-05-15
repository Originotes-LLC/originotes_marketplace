/* eslint-disable tailwindcss/no-custom-classname */
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const ServiceEditorHeader = () => {
  return (
    <div className="flex flex-col items-start border-b border-neutral-200 px-12 pb-5">
      <Link
        href={"/vendor/listings?page=1"}
        className="dark:text-background inline-flex items-center text-sm font-semibold tracking-wider text-neutral-900"
      >
        <ArrowLeftIcon className="dark:text-background mr-2 size-4 font-semibold text-neutral-900" />
        Back to listings
      </Link>
      <h3 className="dark:text-background mt-6 text-2xl font-semibold leading-6 tracking-wider text-neutral-900">
        New Service
      </h3>
    </div>
  );
};
