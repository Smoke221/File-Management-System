import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="circle-container">
      <svg fill="none" className="circle-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle className="circle" cx="50" cy="50" r="45" />
      </svg>
    </div>
  );
};

export default Loader;
