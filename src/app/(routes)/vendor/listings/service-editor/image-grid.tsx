import React, { useEffect } from "react";

/* eslint-disable tailwindcss/no-custom-classname */
import type { EnhancedFile } from "@/types/index";
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";

export const ImageVideoGrid = ({
  files,
  uploadBtn,
}: {
  files: EnhancedFile[];
  uploadBtn: React.JSX.Element;
}) => {
  const [image1, ...rest] = files.filter((file) => file.type.includes("image"));
  const uploadBtnArray = Array.from(
    { length: 9 - rest.length },
    () => uploadBtn
  );


  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  // 
  return (
    <div className="grid gap-2 md:grid-cols-2 md:gap-y-0">
      <ul className="flex space-x-2 md:flex-col md:space-x-0">
        {image1 && (
          <li className="w-full">
            <div className="aspect-h-7 aspect-w-10 group relative block w-full overflow-hidden rounded-lg border border-neutral-300">
              <Image
                fill
                onLoad={() => {
                  URL.revokeObjectURL(image1?.preview as string);
                }}
                src={image1?.preview as string}
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
            </div>
          </li>
        )}
      </ul>
      <ul role="list" className="grid grid-cols-3 gap-2">
        {rest.length > 0 &&
          rest.map((file: EnhancedFile) => (
            <li key={file.preview}>
              <div className="aspect-h-7 aspect-w-10 group block size-full overflow-hidden rounded-lg border border-neutral-300">
                <Image
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  fill
                  src={file.preview}
                  alt=""
                  className="pointer-events-none object-cover group-hover:opacity-75"
                />
              </div>
            </li>
          ))}
        {uploadBtnArray.map((btn, idx) => (
          <li key={idx}>
            <div className="aspect-h-7 aspect-w-10 group block size-full overflow-hidden rounded-lg border border-dashed border-neutral-300">
              <div className="flex size-full items-center justify-center">
                <RiImageAddFill className="size-8 text-neutral-300 dark:text-neutral-200" />
              </div>
              {btn}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
