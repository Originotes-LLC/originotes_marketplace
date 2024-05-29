import type { S3File } from "@/types/index";

export const appendMultipleFilesToFormData = (
  formDataFieldName: string,
  data: File[] | S3File[]
): FormData | Error => {
  if (!formDataFieldName) {
    throw new Error("The formDataFieldName argument is required");
  }

  if (!data || data.length === 0) {
    throw new Error(
      "The data argument is required and must be an array of files"
    );
  }

  try {
    const formData = new FormData();
    data.forEach((file) => {
      if ("status" in file) {
        // the value for .append - second argument - expects a Blob or a string, so we need to JSON.stringify the object for the case when S3 Files are passed to this function
        formData.append(formDataFieldName, JSON.stringify(file));
      } else {
        // the value for .append - second argument - expects a Blob or a string, so no need for JSON.stringify in the case when the user has just selected the Files he/she wants to upload
        formData.append(formDataFieldName, file);
      }
    });
    return formData;
  } catch (error) {
    console.log("error WTF : ", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(
        "An error occurred while appending the files to the FormData instance"
      );
    }
  }
};
