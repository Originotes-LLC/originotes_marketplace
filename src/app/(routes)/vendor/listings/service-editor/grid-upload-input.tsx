export const GridUploadInput = ({
  getRootProps,
  getInputProps,
}: {
  getRootProps: any;
  getInputProps: any;
}) => {
  return (
    <div className="size-full" {...getRootProps()}>
      <input
        {...getInputProps()}
        id="image_file_input_react"
        name="image_file_input_react"
        type="file"
        className="sr-only"
      />
    </div>
  );
};
