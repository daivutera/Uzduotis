import React from 'react';
import Button from './Button';
import UIStatesDiv from './UIStatesDiv';
import KeyGenerator from '@omer_bhatti/react-keys';

const UiStates = () => {
  const listOfGridDivSamples = [
    { nameDiv: 'Filled (default)', color: 'bg-slate-200' },
    { nameDiv: 'Hover', color: 'bg-slate-100' },
    { nameDiv: 'Down', color: 'bg-slate-300' },
    { nameDiv: 'Clear', color: 'bg-white' },
    { nameDiv: 'Start point', color: 'bg-start' },
    { nameDiv: 'End point', color: 'bg-end' },
    { nameDiv: 'Shortest path', color: 'bg-path' },
  ];
  const listOfGridDivButtons = [
    { nameButton: 'Default', color: 'bg-blue-500' },
    { nameButton: 'Hover', color: 'bg-blue-400' },
    { nameButton: 'Down', color: 'bg-sky-800' },
  ];
  const generateUiStatesDivs = () => {
    return listOfGridDivSamples.map((itemDiv) => (
      <UIStatesDiv
        key={itemDiv.nameDiv}
        color={itemDiv.color}
        uiStatesName={itemDiv.nameDiv}
      />
    ));
  };
  const generateUiStatesButtons = () => {
    return listOfGridDivButtons.map((item) => (
      <div key={KeyGenerator.getKey()} className='-ml-2'>
        <p
          key={KeyGenerator.getKey()}
          className='-mb-4 ml-2 text-xs text-slate-800'>
          {item.nameButton}
        </p>
        <Button key={item.nameButton} color={item.color}>
          Generate
        </Button>
      </div>
    ));
  };
  return (
    <div>
      <p>UI States</p>
      <div className='grid grid-cols-6'>{generateUiStatesButtons()}</div>
      <div className='grid grid-cols-custom'>{generateUiStatesDivs()}</div>
    </div>
  );
};

export default UiStates;
