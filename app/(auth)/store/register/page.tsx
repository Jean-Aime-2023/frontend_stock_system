'use client';
import AuthText from '@/components/common/AuthText';
import Input from '@/components/common/Input';
import React, { useState } from 'react';

const StockRegisteration = () => {
  const [stockData, setStockData] = useState({
    district: '',
    sector: '',
    centerOrKnownName: '',
    houseOrTower: '',
    doorNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockData({
      ...stockData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(stockData); // Replace this with your logic for form submission
  };

  return (
    <div className="flex items-center flex-col justify-center w-full">
      <AuthText
        title="Manage Stock"
        text="Fill in the details to manage your stock effectively"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full mt-10"
      >
        {/* District Input */}
        <Input
          label="District"
          value={stockData.district}
          onChange={handleInputChange}
          name="district"
          required
          placeholder="eg: Nyarugenge"
        />
        {/* Sector Input */}
        <Input
          label="Sector"
          value={stockData.sector}
          onChange={handleInputChange}
          name="sector"
          required
          placeholder="eg: Nyarugenge"
        />
        {/* Center or Known Name Input */}
        <Input
          label="Center or Known Name"
          value={stockData.centerOrKnownName}
          onChange={handleInputChange}
          name="centerOrKnownName"
          required
          placeholder="eg: Mu mugi"
        />
        {/* House or Tower Input */}
        <Input
          label="House or Tower"
          value={stockData.houseOrTower}
          onChange={handleInputChange}
          name="houseOrTower"
          required
          placeholder="eg: Isoko rishya"
        />
        {/* Door Number Input */}
        <Input
          label="Door Number"
          value={stockData.doorNumber}
          onChange={handleInputChange}
          name="doorNumber"
          required
          placeholder="e.g., B-50"
        />
        <div className="flex w-full items-center gap-6 mb-10 max-md:flex-col max-md:gap-3">
          <button
            type="submit"
            className="bg-transparent border-2 border-[#B0B0B0] text-[#B0B0B0] btn flex-1"
          >
            Back
          </button>
          <button type="submit" className="w-full bg-blue text-white btn flex-1">
            Set Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockRegisteration;
