import React from 'react';

const Button = ({ children, color }) => {
  return (
    <button
      className={`${
        color ? color : 'bg-blue-400'
      } px-4 py-2 mt-5 mx-2 rounded-md text-white text-sm h-8 flex items-center`}>
      {children}
    </button>
  );
};

export default Button;
