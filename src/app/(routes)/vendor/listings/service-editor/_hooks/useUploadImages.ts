import { useEffect, useState } from "react";

import { ServiceListingSchema } from "@/lib/schema";
import type { UseFormReturn } from "react-hook-form";
import { reduceErrorCodes } from "@/utils/reduce-error-codes";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { z } from "zod";

/*

TODO: Once we will decide on how to store videos, we will implement video upload functionality
"video/mp4": [".mp4"],
"video/quicktime": [".mov"],
"video/avi": [".avi"],
"video/x-msvideo": [".avi"],
"video/x-flv": [".flv"],
"video/x-matroska": [".mkv"],
"video/x-ms-wmv": [".wmv"],
"video/x-ms-asf": [".asf"],
"video/x-mpeg": [".mpeg"],
"video/x-ogm": [".ogm"],
"video/3gpp": [".3gp"],
"video/3gpp2": [".3g2"],
"video/ogg": [".ogg"],
"video/webm": [".webm"],
*/
export const useUploadImages = (
  form: UseFormReturn<z.infer<typeof ServiceListingSchema>>
) => {
  const [uploadedFiles, setUploadedFiles] = useState<(null | File)[]>([]);
  console.log("uploadedFiles: ", uploadedFiles);

  const [isUploading, setIsUploading] = useState(false);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    maxFiles: 10 - uploadedFiles.length,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        setUploadedFiles([...acceptedFiles]);
      }
      return null;
    },
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      const errorMessages = reduceErrorCodes(fileRejections);
      toast.error(`Error: ${errorMessages.join(", ")}`, {
        duration: 15000,
        closeButton: true,
        position: "top-right",
      });
    }
  }, [fileRejections]);

  return {
    isUploading,
    getRootProps,
    getInputProps,
    fileRejections,
    uploadedFiles,
  };
};
