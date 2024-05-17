import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

//
export const useUploadVideoOnly = () => {
  const [selectedVideo, setSelectedVideo] = useState<File[] | []>([]);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    maxFiles: 1,
    maxSize: 100000000,
    accept: {
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
    },
    onDrop: (acceptedFiles) => {
      if (selectedVideo.length === 1) {
        toast.error("You can only upload up to 1 video.", {
          duration: 5000,
          position: "top-right",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
      setSelectedVideo(acceptedFiles);
    },
  });
  return { getRootProps, getInputProps, selectedVideo, fileRejections };
};
