import React from "react";
import FileList from "../components/FileList";
import FileUploader from "../components/FileUploader";

export default function () {
  const centerStyle = {
    textAlign: 'center',
  };

  return (
    <>
      <h1 style={centerStyle}>File Management System</h1>
      <FileUploader />
      <FileList />
    </>
  );
}
