import type { EnhancedFile, SwellError, SwellFile } from "@/types/index";
import { useCallback, useEffect, useState } from "react";

import { ServiceListingSchema } from "@/lib/schema";
import type { UseFormReturn } from "react-hook-form";
import { reduceErrorCodes } from "@/utils/reduce-error-codes";
import { saveAcceptedFiles } from "@/vendor/actions";
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
  const [files, setFiles] = useState<EnhancedFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<SwellFile[]>([]);
  console.log("uploadedFiles: ", uploadedFiles);
  const [swellErrors, setSwellErrors] = useState<SwellError | null>(null);
  console.log("swellErrors: ", swellErrors);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    maxFiles: 10 - files.length,
    maxSize: 100000000,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });
      setFiles([...files, ...newFiles]);
    },
  });
  const uploadFiles = useCallback(async () => {
    if (files.length > 0) {
      const formData = new FormData();
      files.length > 0 &&
        files.forEach((file) => {
          formData.append("service_image_file", file);
        });
      return await saveAcceptedFiles(formData);
    }

    return null;
  }, [files]);

  useEffect(() => {
    uploadFiles()
      .then((res) => res)
      .then((data) => {
        if (data && "errors" in data) {
          toast.error(`Error: ${data.errors}`, {
            duration: 15000,
            closeButton: true,
            position: "top-right",
          });
          setSwellErrors({ errors: data.errors });
        } else {
          setUploadedFiles(data as SwellFile[]);
        }
      })
      .catch((err) => console.log(err));
  }, [uploadFiles]);

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
    files,
    getRootProps,
    getInputProps,
    fileRejections,
    uploadedFiles,
    swellErrors,
  };
};
