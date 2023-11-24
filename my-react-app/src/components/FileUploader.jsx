import React, { useState } from 'react';
import axios from "axios";
import Loader from './Loader';
import './FileUploader.css';

const FileUploader = () => {
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (event) => {
    event.preventDefault();
    
    setLoading(true);

    const fileInput = event.target.elements.file;
    const file = fileInput.files[0];

    if (!file) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("uploadedFile", file);

      // Make a POST request to the backend.
      const response = await axios.post(
        "http://localhost:3000/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setLoading(false); // Set loading back to false after the request is complete
    }
  };

  return (
    <div className="file-uploader-container">
      <h2 className='heading'>File Uploader</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" name="file" />
        <button type="submit" className="upload-button">Upload</button>
      </form>

      {loading && <Loader />}
    </div>
  );
};

export default FileUploader;
