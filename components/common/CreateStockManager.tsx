'use client';
import React, { useState } from 'react';
import Input from './Input';
import { Button } from '../ui/button';

interface CreateStockManagerProps {
  onSuccess: () => void;
}

const CreateStockManager: React.FC<CreateStockManagerProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactInfo: '',
    tempPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <form
      className="w-[70%] max-lg:w-full rounded-[8px] p-16 px-32 max-xl:px-28 max-lg:px-10 max-lg:p-10 max-md:p-5 bg-white border shadow my-2 flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div>
        <h3 className="font-semibold text-[24px] pb-1">Create Stock / Section Manager</h3>
        <p className="text-[#667085]">
          You have selected that your stock will be managed by someone else. Provide all the information in the fields
          below.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <Input
          label="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          name="fullName"
          required
          placeholder="e.g., ISHIMWE Justin"
        />
        <Input
          label="Email or Phone Number"
          value={formData.contactInfo}
          onChange={handleInputChange}
          name="contactInfo"
          required
          placeholder="e.g., +2507... or ishim.....@gmail.com"
        />
        <Input
          label="Temporary Password"
          value={formData.tempPassword}
          onChange={handleInputChange}
          name="tempPassword"
          required
          placeholder="Enter a temporary password"
        />
      </div>
      <Button
        variant="default"
        className="mt-[.5rem] py-6 max-md:py-5 bg-blue hover:bg-blue/80"
        type="submit"
      >
        Create Stock or Section Manager
      </Button>
    </form>
  );
};

export default CreateStockManager;
