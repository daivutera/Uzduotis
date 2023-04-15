import React from 'react';
import Input from './Input';
import Button from './Button';
import { useSetAtom, useAtom } from 'jotai';
import {
  generateGridAtom,
  generateInitialGridAtom,
  updateGridAtom,
  newInputValuesAtom,
} from './formContainer.atoms';
import { inputValueAtom } from './input.atoms';

const FormContainer = () => {
  const setGenerateGrid = useSetAtom(generateGridAtom);
  const setGenerateInitialGrid = useSetAtom(generateInitialGridAtom);
  const setUpdateGrid = useSetAtom(updateGridAtom);
  const [inputValue] = useAtom(inputValueAtom);

  const setNewInputValue = useSetAtom(newInputValuesAtom);
  const handleSubmit = (event) => {
    event.preventDefault();
    setGenerateGrid(true);
    setGenerateInitialGrid(false);
    setUpdateGrid(true);
    setNewInputValue(inputValue);
  };
  return (
    <form
      className='bg-slate-200 h-24 my-8 py-4 pl-8 flex items-center'
      onSubmit={handleSubmit}>
      <Input
        inputName='rows'
        inputType='number'
        minValue='0'
        maxValue='20'
        labelFor='Rows'
        labelName='Rows'
      />
      <p className='text-sm mt-4 text-slate-600'>x</p>
      <Input
        inputName='columns'
        inputType='number'
        minValue='0'
        maxValue='20'
        labelFor='Columns'
        labelName='Columns'
      />
      <Button>Generate</Button>
    </form>
  );
};

export default FormContainer;
