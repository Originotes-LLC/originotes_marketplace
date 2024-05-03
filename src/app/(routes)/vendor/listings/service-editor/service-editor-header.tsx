import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const ServiceEditorHeader = () => {
  return (
    <div className="flex flex-col items-start border-b border-neutral-200 px-12 pb-5">
      <Link
        href={"/vendor/listings?page=1"}
        className="inline-flex items-center text-sm font-semibold tracking-wider text-neutral-900 dark:text-background"
      >
        <ArrowLeftIcon className="mr-2 size-4 font-semibold text-neutral-900 dark:text-background" />
        Back to listings
      </Link>
      <h3 className="mt-6 text-2xl font-semibold leading-6 tracking-wider text-neutral-900 dark:text-background">
        New Service
      </h3>
    </div>
  );
};
