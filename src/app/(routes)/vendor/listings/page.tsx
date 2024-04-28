import { ListingHeader } from "@/routes/vendor/listings/listing_header";
import { ListingPagination } from "@/routes/vendor/listings/listing_pagination";
import { ListingsGrid } from "@/routes/vendor/listings/listings_grid";
import { Suspense } from 'react';
import { currentUser } from "@clerk/nextjs/server";
import { getServicesByVendorId } from "@/lib/services";

interface Service {
  count: number,
  page_count: number,
  page: number,
  limit: number,
  pages: {
    [key: string]: { start: number, end: number }
  },
  results: []
}

export default async function VendorListings({ searchParams }: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {

  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const user = await currentUser();
  const services: Service = await getServicesByVendorId(user?.id, page);

  return (
    <>
      <div>
        <main className="py-6 lg:pl-72">
          <ListingHeader />
          {/* TODO: Improve the Loading Services aka use Skeleton loader?  */}
          <Suspense fallback={<p>Loading services...</p>}>
            <ListingsGrid services={services.results} />
          </Suspense>
          {/* TODO: Improve the loading pagination as well, maybe a skeleton as well */}
          <Suspense fallback={<p>Loading pagination...</p>}>
            <ListingPagination count={services.count} page={page} pages={services.pages} pageCount={services.page_count} />
          </Suspense>
        </main>
      </div>
    </>
  );
}
