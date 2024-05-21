import "server-only";

import type { SwellError, SwellFile } from "@/types/index";

import sizeOf from "image-size";
import swell from "@/lib/server";

export const uploadFiles = async (
  files: File[]
): Promise<SwellFile[] | SwellError> => {
  console.log(`FILES IN UPLOAD FILES:`, files);
  if (!files.length) {
    return {
      errors: {
        name: {
          code: "no-files",
          message:
            "There are no files to upload or the files received are not valid.",
        },
      },
    };
  }

  return await Promise.all(
    files.map(async (file) => {
      // arrayBuffer is a method of the Blob interface, wich returns a Promise that resolves with the contents of the blob as binary data
      const arrayBuffer = await file.arrayBuffer();
      const bufferBeforeBase64Str = Buffer.from(arrayBuffer);
      const imgDimensions = sizeOf(bufferBeforeBase64Str);
      const dataStream = bufferBeforeBase64Str.toString("base64");
      // const dataStream = Buffer.from(arrayBuffer).toString("base64");
      return await swell.post("/:files", {
        content_type: file.type,
        filename: file.name,
        data: {
          $base64: dataStream,
        },
        width: imgDimensions.width,
        height: imgDimensions.height,
      });
    })
  );
};
