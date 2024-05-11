import { useDropzone } from "react-dropzone";
import { useState } from "react";
type EnhancedFile = File & { preview: string };

const ACCEPTED_IMAGE_TYPES = [".jpeg", ".png", ".webp", ".jpg"];

//
export const useSelectedFiles = () => {
  const [files, setFiles] = useState<EnhancedFile[]>([]);
  const [formFiles, setFormFiles] = useState<File[]>([]);
  console.log("formFiles: ", formFiles);
  // console.log("files: ", files);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    accept: {
      "image/jpeg": ACCEPTED_IMAGE_TYPES,
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
    },
    onDrop: (acceptedFiles) => {
      setFormFiles([...acceptedFiles]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return { formFiles, files, getRootProps, getInputProps };
};
