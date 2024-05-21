import Image from "next/image";
import type { Product } from "@/types/index";
import { formattedDate } from "@/utils/date_formats";

export const ListingsGrid = ({ services }: { services: Product[] }) => {


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
                {service?.images?.[0]?.file?.width && service?.images?.[0]?.file?.height && (
                  <Image
                    width={service.images[0].file?.width}
                    height={service.images[0].file?.height}
                    src={service.images[0].file.url}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-neutral-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                )}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-neutral-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  {service?.date_updated ? (
                    <time
                      dateTime={service?.date_updated}
                      className="text-neutral-500"
                    >
                      Updated on {formattedDate(service?.date_updated)}
                    </time>
                  ) : (<div className="text-neutral-500">
                    Not updated yet
                  </div>)}
                  <div className="relative z-10 rounded-full bg-fuchsia-50 px-3 py-1.5 font-medium text-fuchsia-800 hover:bg-fuchsia-100">
                    {/* TODO: What if a service has multiple categories? Will you show them all? I don't think you have space here for that... */}
                    {service?.categories?.results[0]?.name}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-neutral-900 group-hover:text-neutral-600">
                    <span className="absolute inset-0" />
                    {service.name}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-600">
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
