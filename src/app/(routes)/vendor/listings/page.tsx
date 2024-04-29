import { EmptyListings } from "@/listings/empty_listings";
import { ListingHeader } from "@/routes/vendor/listings/listing_header";
import { ListingPagination } from "@/routes/vendor/listings/listing_pagination";
import { ListingsGrid } from "@/routes/vendor/listings/listings_grid";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getServicesByVendorId } from "@/lib/services";
interface Service {
  error?: Error;
  message?: string;
  count: number;
  page_count: number;
  page: number;
  limit: number;
  pages: {
    [key: string]: { start: number; end: number };
  };
  results: [];
}

export default async function VendorListings({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const user = await currentUser();
  const services: Service = await getServicesByVendorId(user?.id, page);
  console.log("services: ", services);

  if (!services || services?.error) {
    throw new Error(
      services?.message || "An error occurred while fetching services"
    );
  }

  if (services.count > 0 && page > services.page_count) {
    throw new Error(
      "The page number you are trying to access is invalid. Please provide a valid page number."
    );
  }

  return (
    <>
      <div className="flex size-full">
        <main className="flex size-full flex-col py-6 lg:pl-72">
          <div className="flex-none">
            <ListingHeader />
          </div>
          {/* TODO: Improve the Loading Services aka use Skeleton loader?  */}
          <Suspense fallback={<p>Loading services...</p>}>
            {!services?.count ? (
              <div className="mx-auto max-w-7xl grow px-6 lg:px-8">
                <EmptyListings />
              </div>
            ) : (
              <div className="grow">
                <ListingsGrid services={services.results} />
              </div>
            )}
          </Suspense>
          {/* TODO: Improve the loading pagination as well, maybe a skeleton as well */}
          <Suspense fallback={<p>Loading pagination...</p>}>
            <div className="flex-none">
              <ListingPagination
                count={services.count}
                page={page}
                pages={services.pages}
                pageCount={services.page_count}
              />
            </div>
          </Suspense>
        </main>
      </div>
    </>
  );
}
