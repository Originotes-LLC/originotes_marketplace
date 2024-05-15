import React, { useEffect } from "react";

/* eslint-disable tailwindcss/no-custom-classname */
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";

// import { PhotoIcon } from "@heroicons/react/24/solid";

// import { PlusCircleIcon } from "@heroicons/react/24/outline";

type EnhancedFile = File & { preview: string };

export const ImageVideoGrid = ({
  files,
  uploadBtn,
}: {
  files: EnhancedFile[];
  uploadBtn: React.JSX.Element;
}) => {
  // TODO: Once we decide on how to store videos, we can use this hook and add videos to the products
  // const videoFile = files.find((file) => file.type.includes("video"));
  // console.log('videoFile: ', videoFile);
  const [image1, ...rest] = files.filter((file) => file.type.includes("image"));
  const uploadBtnArray = Array.from(
    { length: 9 - rest.length },
    () => uploadBtn
  );
  // TODO: Once we decide on how to store videos, we can use this hook and add videos to the products
  // const { getRootProps, getInputProps, selectedVideo, fileRejections } = useUploadVideoOnly()



  // 
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
        {/* {files.length > 0 && !videoFile ? (
          <li className="w-full">
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg border border-dashed border-neutral-300">
              <div className="flex size-full items-center justify-center">
                <div className="relative inline-block">
                  <VideoCameraIcon className="size-12 text-neutral-300" />
                  <PlusCircleIcon className="absolute left-0 -ml-2 -mt-5 size-5 text-neutral-400" />
                </div>
              </div>
              <div className="size-full" {...getRootProps()}>
                <input
                  {...getInputProps()}
                  id="video_file_input"
                  name="video_file_input"
                  type="file"
                  className="sr-only"
                />
              </div>
            </div>
          </li>
        ) : (
          videoFile && (
            <li className="w-full">
              <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg border border-neutral-300">
                <video
                  aria-label="Video player"
                  className="size-full object-cover"
                  controls
                >
                  <source src={videoFile.preview} />
                  Your browser does not support the video tag.
                </video>
              </div>
            </li>
          )
        )} */}
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
