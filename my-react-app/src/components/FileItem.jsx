// FileItem.js
import React, { useState } from "react";
import axios from "axios";
import "./FileItem.css";
import Loader from "./Loader";

const FileItem = ({ file, props }) => {
  const [notification, setNotification] = useState(null);
  const handleDelete = async (file) => {
    try {
      setNotification("Deleting...");
      const response = await axios.delete(
        `http://localhost:3000/file/delete/${file.filename}`
      );
      console.log(response.data.message);
      setNotification("Deleted successfully");
      setTimeout(() => {
        setNotification(null);
        props.setUpdate(!props.update);
      }, 2000);
    } catch (error) {
      console.error('Error deleting file:', error.response ? error.response.data : error.message);
      // Handle the error and display a user-friendly message
      setNotification('Deletion failed: File not found');
      setTimeout(() => {
        setNotification(null);
      }, 2000);
    }
  };

  return (
    <div className="file-item-container">
      <span>{file.filename}</span>
      <img src={file.fileUrl} alt="" className="file-image" />
      <p>{file.size}</p>
      <button className="dlt-btn" onClick={() => handleDelete(file)}>
        Delete
      </button>
      {/* <Loader/> */}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default FileItem;