import type { CustomSwellFile, S3File } from "@/types/index";
import {
  saveUploadedFilesInSwell,
  uploadFilesToAmazonS3,
} from "@/vendor/actions";
import { useEffect, useState } from "react";

import { ServiceListingSchema } from "@/lib/schema";
import type { UseFormReturn } from "react-hook-form";
import { appendMultipleFilesToFormData } from "@/utils/formData-multiple-append";
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
  const [uploadedFiles, setUploadedFiles] = useState<
    (File | S3File | CustomSwellFile)[]
  >([]);
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
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        setUploadedFiles([...acceptedFiles]);
        // upload the files to AWS S3 bucket
        const appendedFiles = appendMultipleFilesToFormData(
          "files",
          acceptedFiles
        );

        const filesSavedInS3 = await uploadFilesToAmazonS3(appendedFiles);
        // save the files in Swell after uploading to S3
        const savedS3Files = appendMultipleFilesToFormData(
          "files",
          filesSavedInS3
        );

        const filesSavedInSwell = await saveUploadedFilesInSwell(savedS3Files);

        // TODO: Handle the case when the files are not saved in Swell and you get an Error
        if (filesSavedInSwell instanceof Error) {
          console.log("Error saving files in Swell: ", filesSavedInSwell);
        } else {
          setUploadedFiles(filesSavedInSwell);
        }
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
    setUploadedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
    uploadedFiles,
  };
};
