import type { CustomSwellFile, S3File, S3IdAndSwellId } from "@/types/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { GridUploadInput } from "./grid-upload-input";
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";
import { TrashIcon } from "@radix-ui/react-icons";

/* eslint-disable tailwindcss/no-custom-classname */

export const ImageGrid = ({
  deleteImage,
  isUploading,
  files,
  uploadBtn,
}: {
  deleteImage: ({ s3id, id }: S3IdAndSwellId) => void;
  isUploading: boolean;
  files: (S3File | File | CustomSwellFile | null | string)[];
  uploadBtn: {
    rootProps: any;
    inputProps: any;
  };
}) => {
  const [firstImage, ...rest] = files;




  return (
    <div className="grid gap-2 md:grid-cols-2 md:gap-y-0">
      <ul className="flex space-x-2 md:flex-col md:space-x-0">
        {isUploading && firstImage instanceof File ? (
          <li className="size-full">
            <div className="aspect-h-5 aspect-w-6 group relative block size-full overflow-hidden rounded-lg border border-neutral-300 dark:bg-neutral-900">
              <div className="flex size-full items-center justify-center">
                <svg
                  className="-ml-1 mr-3 size-5 animate-spin text-black dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            </div>
          </li>
        ) : typeof firstImage === "object" && firstImage && "url" in firstImage ? (
          <li className="group size-full transition-all duration-300 ease-in-out">
            <div className="aspect-h-5 aspect-w-6 relative block size-full overflow-hidden rounded-sm border border-neutral-300 group-hover:shadow-sm group-hover:shadow-neutral-800/40">
              <Image
                width={firstImage.width}
                height={firstImage.height}
                src={firstImage.url}
                alt=""
                className="pointer-events-none object-contain"
              />

              <div className="hidden group-hover:absolute group-hover:inset-0 group-hover:block group-hover:bg-gradient-to-t group-hover:from-white">
                <div className="flex size-full items-end justify-end">
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={async () => deleteImage({
                            s3id: firstImage.s3id,
                            id: firstImage.id,
                          })}
                          type="button"
                          className="m-2 rounded-full bg-red-600 p-1.5 text-white shadow-2xl hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          <TrashIcon className="size-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </li>
        ) : (
          <li className="size-full">
            <div className="aspect-h-5 aspect-w-6 group block size-full overflow-hidden rounded-lg border border-dashed border-neutral-300">
              <div className="flex size-full items-center justify-center">
                <RiImageAddFill className="size-8 text-neutral-300 dark:text-neutral-200" />
              </div>
              <GridUploadInput
                getRootProps={uploadBtn.rootProps}
                getInputProps={uploadBtn.inputProps}
              />
            </div>
          </li>
        )}
      </ul>
      <ul role="list" className="grid grid-cols-3 gap-2">
        {rest.length > 0 &&
          rest.map((elem, idx) => {
            if (!elem) {
              return (
                <li className="size-full" key={idx}>
                  <div className="aspect-h-5 aspect-w-6 group block size-full overflow-hidden rounded-lg border border-dashed border-neutral-300">
                    <div className="flex size-full items-center justify-center">
                      <RiImageAddFill className="size-8 text-neutral-300 dark:text-neutral-200" />
                    </div>
                    <GridUploadInput
                      getRootProps={uploadBtn.rootProps}
                      getInputProps={uploadBtn.inputProps}
                    />
                  </div>
                </li>
              );
            }

            if (typeof elem === "object" && elem && "url" in elem) {
              return (
                <li
                  key={elem.id}
                  className="duration-5000 group size-full transition-all ease-in-out"
                >
                  <div className="aspect-h-5 aspect-w-6 relative block size-full overflow-hidden rounded-sm border border-neutral-300 group-hover:shadow-sm group-hover:shadow-neutral-800/40">
                    <Image
                      width={elem.width}
                      height={elem.height}
                      src={elem.url}
                      alt=""
                      className="pointer-events-none object-cover group-hover:opacity-75"
                    />
                    <div className="hidden group-hover:absolute group-hover:inset-0 group-hover:block group-hover:bg-gradient-to-t group-hover:from-white">
                      <div className="flex size-full items-end justify-end">
                        <TooltipProvider>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => {
                                  if (elem.id) deleteImage({
                                    s3id: elem.s3id,
                                    id: elem.id
                                  });
                                }}
                                type="button"
                                className="m-2 rounded-full bg-red-600 p-1.5 text-white shadow-2xl hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                              >
                                <TrashIcon className="size-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            if (typeof elem === "string") {
              return (
                <li className="size-full" key={idx}>
                  <div className="aspect-h-5 aspect-w-6 group relative block size-full overflow-hidden rounded-lg border border-neutral-300 dark:bg-neutral-900">
                    <div className="flex size-full items-center justify-center">
                      <p>{elem}</p>
                    </div>
                  </div>
                </li>
              )
            }

            return (
              <li className="size-full" key={idx}>
                <div className="aspect-h-5 aspect-w-6 group relative block size-full overflow-hidden rounded-lg border border-neutral-300 dark:bg-neutral-900">
                  <div className="flex size-full items-center justify-center">
                    <svg
                      className="-ml-1 mr-3 size-5 animate-spin text-black dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
