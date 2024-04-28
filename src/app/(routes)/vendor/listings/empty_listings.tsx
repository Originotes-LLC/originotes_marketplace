import { RectangleGroupIcon } from "@heroicons/react/24/outline";

export const EmptyListings = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <RectangleGroupIcon className="size-24 w-full text-gray-300" />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-800">
          You don&apos;t have any services
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Start by creating one in the button above.
        </p>
      </div>
    </main>
  );
};
