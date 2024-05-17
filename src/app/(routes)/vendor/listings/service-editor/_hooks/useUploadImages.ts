import { useEffect, useState } from "react";

import { reduceErrorCodes } from "@/utils/reduce-error-codes";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type EnhancedFile = File & { preview: string };

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
export const useUploadImages = () => {
  const [files, setFiles] = useState<EnhancedFile[]>([]);
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
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
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

  return { files, getRootProps, getInputProps, fileRejections };
};
