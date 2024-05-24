import "server-only";

import type { SwellError, SwellFile } from "@/types/index";

import sizeOf from "image-size";
import swell from "@/lib/server";

export const uploadFiles = async (
  files: File[]
): Promise<(SwellFile | undefined | null)[] | SwellError> => {
  return await Promise.all(
    files.map(async (file) => {
      console.log(`uploading file => ${file.name}...`);

      const arrayBuffer = await file.arrayBuffer();
      const bufferBeforeBase64Str = Buffer.from(arrayBuffer);
      const imgDimensions = sizeOf(bufferBeforeBase64Str);
      const dataStream = bufferBeforeBase64Str.toString("base64");

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
