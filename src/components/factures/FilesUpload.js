import React from 'react';
import Dropzone from 'react-dropzone';
const FilesUpload = ({ children }) => (
  <Dropzone onDrop={files => console.log(files)}>{children}</Dropzone>
);

export default FilesUpload;
