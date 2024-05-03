import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Link from "next/link";
import { paginationRange } from "@/utils/pagination_range";

type ListingPaginationProps = {
  count: number;
  page: number;
  pages:
  | {
    [key: string]: { start: number; end: number };
  }
  | undefined;
  pageCount: number;
};

export const ListingPagination = ({
  count,
  page,
  pages,
  pageCount,
}: ListingPaginationProps) => {

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6">
      {pages && (
        <div className="flex flex-1 justify-between sm:hidden">
          <Link
            scroll={false}
            href={
              page > 2
                ? `/vendor/listings?page=${page - 1}`
                : `/vendor/listings?page=${1}`
            }
            className="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Previous
          </Link>
          <Link
            scroll={false}
            href={
              page < pageCount
                ? `/vendor/listings?page=${page + 1}`
                : `/vendor/listings?page=${pageCount}`
            }
            className="relative ml-3 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Next
          </Link>
        </div>
      )}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {pages ? (
            <p className="text-sm text-neutral-700">
              Showing{" "}
              <span className="font-medium">{pages && pages[page] && pages[page].start}</span>{" "}
              to <span className="font-medium">{pages && pages[page] && pages[page].end}</span>{" "}
              of <span className="font-medium">{count}</span> results
            </p>
          ) : (
            <p className="text-sm text-neutral-700">
              Showing{` `}
              <span className="font-medium">{count}</span> results
            </p>
          )}
        </div>
        {pages && (
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <Link
                scroll={false}
                href={
                  page > 2
                    ? `/vendor/listings?page=${page - 1}`
                    : `/vendor/listings?page=${1}`
                }
                className="relative inline-flex items-center rounded-l-md p-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="size-5" aria-hidden="true" />
              </Link>

              {paginationRange(page, pageCount).map((e, i) => {
                if (typeof e === "number") {
                  return (
                    <Link
                      key={i}
                      scroll={false}
                      href={`/vendor/listings?page=${e}`}
                      className={
                        e === page
                          ? "relative z-10 inline-flex items-center bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
                          : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0"
                      }
                    >
                      {e}
                    </Link>
                  );
                } else {
                  return (
                    <span
                      key={i}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-700 ring-1 ring-inset ring-neutral-300 focus:outline-offset-0"
                    >
                      {e}
                    </span>
                  );
                }
              })}

              <Link
                scroll={false}
                href={
                  page < pageCount
                    ? `/vendor/listings?page=${page + 1}`
                    : `/vendor/listings?page=${pageCount}`
                }
                className="relative inline-flex items-center rounded-r-md p-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="size-5" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
