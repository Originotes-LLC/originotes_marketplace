import type { FileRejection } from "react-dropzone";

export const reduceErrorCodes = (arr: FileRejection[]) => {
  const uniqueErrorMessages = new Set();
  arr.forEach((item) => {
    item.errors.forEach((error) => {
      uniqueErrorMessages.add(error.code);
    });
  });

  const errorCodes = Array.from(uniqueErrorMessages);

  return errorCodes.map((code) => {
    switch (code) {
      case "file-invalid-type":
        return "Invalid file type. Please upload a valid file type";
      case "file-too-large":
        return "One or more of your files are too large. Please upload a smaller file";
      case "file-too-small":
        return "One or more of your files are too small. Please upload a larger file";
      case "too-many-files":
        return "You are trying to upload too many files. Please upload up to 10 images.";
      default:
        return `Something went wrong: ${code}`; // Handle unexpected codes gracefully
    }
  });
};
