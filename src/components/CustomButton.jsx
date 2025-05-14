import React from 'react';
import './CustomButton.css';

const CustomButton = ({ text, onClick, type = 'default' }) => {
  return (
    <button className={`custom-btn ${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
