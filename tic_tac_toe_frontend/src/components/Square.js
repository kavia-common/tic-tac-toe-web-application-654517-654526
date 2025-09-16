import React from 'react';
import '../styles/Square.css';

const Square = ({ value, onClick }) => {
  return (
    <button 
      className={`square ${value ? 'filled' : ''}`} 
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
