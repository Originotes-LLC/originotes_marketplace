import React from 'react';

export const GridUploadInput = ({
  refFileInput,
  getRootProps,
  getInputProps,
}: {
  refFileInput: React.RefObject<HTMLInputElement>;
  getRootProps: any;
  getInputProps: any;
}) => {
  return (
    <div className="size-full" {...getRootProps()}>
      <input
        ref={refFileInput}
        {...getInputProps()}
        id="image_file_input_react"
        name="image_file_input_react"
        type="file"
        className="sr-only"
      />
    </div>
  );
};
