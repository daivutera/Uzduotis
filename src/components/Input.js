import React from 'react';
import { useAtom } from 'jotai';
import { inputValueAtom } from './input.atoms';

const Input = ({
  inputName,
  inputType,
  minValue,
  maxValue,
  labelFor,
  labelName,
}) => {
  const [inputValue, setInputValue] = useAtom(inputValueAtom);
  const defaultGridDimensionValue = 10;

  const handleInput = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    if (value < 1 || value > 20) {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [name]: defaultGridDimensionValue,
      }));
    } else {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [name]: value,
      }));
    }
  };

  return (
    <div className='flex flex-col items-start p-2 mx-2'>
      <label className='text-xs mb-1 text-slate-600' htmlFor={labelFor}>
        {labelName}
      </label>
      <input
        className='h-8 rounded-md w-14 text-center'
        id={inputName}
        name={inputName}
        type={inputType}
        value={
          inputValue[inputName] > 0
            ? inputValue[inputName]
            : defaultGridDimensionValue
        }
        onChange={handleInput}
        min={minValue}
        max={maxValue}
      />
    </div>
  );
};

export default Input;
