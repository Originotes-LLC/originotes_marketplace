import { GridUploadInput } from "./grid-upload-input";
import Image from "next/image";
import React from "react";
import { RiImageAddFill } from "react-icons/ri";
/* eslint-disable tailwindcss/no-custom-classname */
import type { SwellFile } from "@/types/index";
export const ImageGrid = ({
  refFileInput,
  isUploading,
  files,
  uploadBtn,
}: {
  refFileInput: React.RefObject<HTMLInputElement>;
  isUploading: boolean;
  // this are the uploaded files
  files: (SwellFile | File | null)[];
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
            <div className="aspect-h-7 aspect-w-10 group relative block size-full overflow-hidden rounded-lg border border-neutral-300 dark:bg-neutral-900">
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
        ) : firstImage &&
          typeof firstImage === "object" &&
          "url" in firstImage ? (
          <li className="size-full">
            <div className="aspect-h-7 aspect-w-10 group relative block size-full overflow-hidden rounded-lg border border-neutral-300">
              <Image
                width={firstImage?.width}
                height={firstImage?.height}
                src={firstImage?.url}
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
            </div>
          </li>
        ) : null}
      </ul>
      <ul role="list" className="grid grid-cols-3 gap-2">
        {rest.length > 0 &&
          rest.map((elem, idx) => {
            if (!elem) {
              return (
                <li className="size-full" key={idx}>
                  <div className="aspect-h-7 aspect-w-10 group block size-full overflow-hidden rounded-lg border border-dashed border-neutral-300">
                    <div className="flex size-full items-center justify-center">
                      <RiImageAddFill className="size-8 text-neutral-300 dark:text-neutral-200" />
                    </div>

                    <GridUploadInput
                      refFileInput={refFileInput}
                      getRootProps={uploadBtn.rootProps}
                      getInputProps={uploadBtn.inputProps}
                    />
                  </div>
                </li>
              );
            }

            if (typeof elem === "object" && "url" in elem) {
              return (
                <li className="size-full" key={elem.id}>
                  <div className="aspect-h-7 aspect-w-10 group block size-full overflow-hidden rounded-lg border border-neutral-300">
                    <Image
                      width={elem.width}
                      height={elem.height}
                      src={elem.url}
                      alt=""
                      className="pointer-events-none object-cover group-hover:opacity-75"
                    />
                  </div>
                </li>
              );
            }

            return (
              <li className="size-full" key={idx}>
                <div className="aspect-h-7 aspect-w-10 group relative block size-full overflow-hidden rounded-lg border border-neutral-300 dark:bg-neutral-900">
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
