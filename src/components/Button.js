import React from 'react';

const Button = (props) => {
  return (
    <button className='bg-blue-400 px-4 py-2 mt-5 mx-2 rounded-md text-white text-sm h-8 flex items-center'>
      {props.children}
    </button>
  );
};

export default Button;
