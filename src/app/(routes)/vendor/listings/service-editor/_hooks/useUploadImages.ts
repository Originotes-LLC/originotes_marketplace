import type { CustomSwellFile, S3File, S3IdAndSwellId } from "@/types/index";
import {
  deleteS3Image,
  saveUploadedFilesInSwell,
  uploadFilesToAmazonS3,
} from "@/vendor/actions";
import { useEffect, useState } from "react";

import { appendMultipleFilesToFormData } from "@/utils/formData-multiple-append";
import { reduceErrorCodes } from "@/utils/reduce-error-codes";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

export const useUploadImages = () => {
  const [uploadedFiles, setUploadedFiles] = useState<
    (File | S3File | CustomSwellFile | null)[]
  >([]);
  console.log("uploadedFiles: ", uploadedFiles);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const isTheArrayNull = uploadedFiles.every((file) => file === null);

      if (isTheArrayNull) {
        setUploadedFiles([]);
      }
    }
  }, [uploadedFiles]);

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
      const filesToKeep = uploadedFiles.filter((file) => file !== null);

      if (filesToKeep.length + acceptedFiles.length > 10) {
        toast.error(
          `You can only upload up to 10 files. Please upload just ${10 - filesToKeep.length} more ${10 - filesToKeep.length > 1 ? "files" : "file"}.`,
          {
            duration: 15000,
            closeButton: true,
            position: "top-right",
          },
        );
        return;
      }

      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        setUploadedFiles((oldFiles) => {
          const nonNullFiles = oldFiles.filter((file) => file !== null);

          if (nonNullFiles.length === 10) {
            return [...oldFiles];
          }

          if (nonNullFiles.length + acceptedFiles.length < 10) {
            return [
              ...nonNullFiles,
              ...acceptedFiles,
              ...Array.from({
                length: 10 - (nonNullFiles.length + acceptedFiles.length),
              }).fill(null),
            ] as (File | S3File | CustomSwellFile | null)[];
          }

          if (nonNullFiles.length + acceptedFiles.length === 10) {
            return [...nonNullFiles, ...acceptedFiles];
          }

          return oldFiles;
        });

        // upload the files to AWS S3 bucket
        const appendedFiles = appendMultipleFilesToFormData(
          "files",
          acceptedFiles,
        );

        const filesSavedInS3 = await uploadFilesToAmazonS3(appendedFiles);
        console.log("filesSavedInS3: ", filesSavedInS3);
        // save the files in Swell after uploading to S3
        const savedS3Files = appendMultipleFilesToFormData(
          "files",
          filesSavedInS3,
        );

        const filesSavedInSwell = await saveUploadedFilesInSwell(savedS3Files);
        console.log("filesSavedInSwell: ", filesSavedInSwell);

        // TODO: Handle the case when the files are not saved in Swell and you get an Error
        if (typeof filesSavedInSwell === "string") {
          setIsUploading(false);
          toast.error(
            "There was an error trying to save the file(s) in the database",
            {
              duration: 15000,
              closeButton: true,
              position: "top-right",
            },
          );
          setUploadedFiles([]);
          return;
        } else {
          setUploadedFiles((prevFiles) => {
            const filesToKeep = prevFiles.filter(
              (file) => file !== null && !(file instanceof File),
            );

            return [
              ...filesToKeep,
              ...filesSavedInSwell,
              ...Array.from({
                length: 10 - (filesToKeep.length + filesSavedInSwell.length),
              }).fill(null),
            ] as (File | S3File | CustomSwellFile | null)[];
          });
          setIsUploading(false);
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

  const deleteImage = async ({ s3id, id }: S3IdAndSwellId) => {
    setUploadedFiles((files) => {
      return files.map((file) => {
        if (file === null) {
          return null;
        }
        if (file instanceof File) {
          return file;
        }
        if (file && "id" in file) {
          return file.id !== id ? file : null;
        }
        return file;
      });
    });
    await deleteS3Image({ s3id, id });
  };

  return {
    deleteImage,
    isUploading,
    setUploadedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
    uploadedFiles,
  };
};
