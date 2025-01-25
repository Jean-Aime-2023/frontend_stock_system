'use client';
import React, { useState } from 'react';
import Input from './Input';
import { Button } from '../ui/button';

interface CreateStockProps {
  onManagerOption: (option: 'myself' | 'manager') => void;
}

const CreateStock: React.FC<CreateStockProps> = ({ onManagerOption }) => {
  const [formData, setFormData] = useState({
    stockName: '',
    streetAddress: '',
    managerOption: 'myself',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onManagerOption(formData.managerOption as 'myself' | 'manager');
  };

  return (
    <form
      className="w-[70%] max-lg:w-full rounded-[8px] p-16 px-32 max-xl:px-28 max-lg:px-10 max-lg:p-10 max-md:p-5 bg-white border shadow my-2 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <h3 className="font-semibold text-[24px] pb-1">Create Stock / Section</h3>
        <p className="text-[#667085]">Enter the details about stock in the fields below.</p>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <Input
          label="Stock Name"
          value={formData.stockName}
          onChange={handleInputChange}
          name="stockName"
          required
          placeholder="e.g., Kwa Farawo"
        />
        <Input
          label="Street Address"
          value={formData.streetAddress}
          onChange={handleInputChange}
          name="streetAddress"
          required
          placeholder="e.g., KN 400 st"
        />
        <div>
          <label className="block text-[#344054] font-medium mb-2">Who will manage the stock or section?</label>
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="managerOption"
                value="myself"
                checked={formData.managerOption === 'myself'}
                onChange={handleInputChange}
              />
              Myself
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="managerOption"
                value="manager"
                checked={formData.managerOption === 'manager'}
                onChange={handleInputChange}
              />
              Stock / Section Manager
            </label>
          </div>
        </div>
      </div>
      <Button
        variant="default"
        className="mt-[.5rem] py-6 max-md:py-5 bg-blue hover:bg-blue/80"
        type="submit"
      >
        Create Stock or Section
      </Button>
    </form>
  );
};

export default CreateStock;
