import React from 'react';

const UIStatesDiv = ({ color, uiStatesName }) => {
  return (
    <div className='mt-6'>
      <p className='text-xs text-slate-800'>{uiStatesName}</p>
      <div className={`h-12 w-12  border-2  ${color}`}></div>
    </div>
  );
};

export default UIStatesDiv;
