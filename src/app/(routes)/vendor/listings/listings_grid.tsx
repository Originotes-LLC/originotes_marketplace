import Image from "next/image";
import { formattedDate } from "@/utils/date_formats";

type CategoryResults = {
  name: string;
  id: string;
};

interface Categories {
  count: number;
  page_count: number;
  page: number;
  results: CategoryResults[];
}

interface ImageFile {
  id: string;
  date_uploaded: string;
  length: number;
  md5: string;
  filename: string;
  content_type: string;
  url: string;
  width: number;
  height: number;
}

interface ImageObj {
  file: ImageFile;
  id: string;
}

interface PurchaseOption {
  active: boolean;
  price: number;
  sale: boolean;
  sale_price: number | null;
  prices: number[];
}

interface Content {
  vendor_id: string;
}

interface CategoryIndex {
  sort: Record<string, number>;
  id: string[];
}

interface Service {
  name: string;
  sku: string | null;
  type: string;
  active: boolean;
  images: ImageObj[];
  purchase_options: {
    standard: PurchaseOption;
  };
  variable: boolean;
  description: string;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  slug: string;
  attributes: Record<string, any>;
  delivery: any; // Adjust type accordingly
  virtual: boolean;
  bundle: any; // Adjust type accordingly
  price: number;
  stock_tracking: boolean;
  options: any[]; // Adjust type accordingly
  content: Content;
  currency: string;
  sale: boolean;
  sale_price: number | null;
  prices: number[];
  date_created: string;
  stock_status: any; // Adjust type accordingly
  date_updated: string;
  category_index: CategoryIndex;
  id: string;
  categories: Categories;
}

export const ListingsGrid = ({ services }: { services: Service[] }) => {


  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <Image
                  width={service.images[0].file.width}
                  height={service.images[0].file.height}
                  src={service.images[0].file.url}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={service.date_updated}
                    className="text-gray-500"
                  >
                    Updated on {formattedDate(service.date_updated)}
                  </time>
                  <div className="relative z-10 rounded-full bg-fuchsia-50 px-3 py-1.5 font-medium text-fuchsia-800 hover:bg-fuchsia-100">
                    {/* TODO: What if a service has multiple categories? Will you show them all? I don't think you have space here for that... */}
                    {service.categories.results[0].name}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {service.name}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
