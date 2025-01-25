import React, { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string; // Default to 'text' if not specified
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  name: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = 'text', // Default to 'text' input type
  placeholder,
  required = false,
  errorMessage,
  name,
}) => {
  return (
    <div className="mb-4 flex flex-1 items-start flex-col gap-2">
        <label
          htmlFor={name}
          className="block font-medium text-gray-700 bg-white pl-1 -mb-4 px-3 rounded z-10 ml-4 text-sm"
        >
          {label} <span className='text-red-500'>*</span>
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full py-4 px-4 rounded-[10px] bg-[#F4F4F4] text-[#3F4056] placeholder-[#3F4056] border-[2px] focus:border-gray-400 outline-none"
        />
      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
