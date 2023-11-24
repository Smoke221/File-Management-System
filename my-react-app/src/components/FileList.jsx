// FileList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileItem from './FileItem';
import Loader from './Loader';

const FileList = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/file/files')
      .then(response => {
        setFiles(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, [update]);

  return (
    <div>
      {loading && <Loader />}
      <h2>List of files</h2>
      <div className='parent-container'>
      {files.map((file,index) => (
        <FileItem key={index} file={file} props={{update,setUpdate}} />
      ))}
      </div>
    </div>
  );
};

export default FileList;