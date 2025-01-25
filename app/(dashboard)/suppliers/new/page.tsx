'use client';
import Input from '@/components/common/Input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewSupplier = () => {
  const router = useRouter();

  const [supplierName, setSupplierName] = useState('');
  const [contacts, setContacts] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push('/suppliers');
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white w-[80%] flex flex-col gap-6 rounded-[20px] p-10 py-20 px-[8rem]">
        <div>
          <h1 className="text-[24px] font-semibold">Create New Supplier</h1>
          <p className="text-[#667085] py-2">
            Enter the details about the supplier in the fields below.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Supplier Name"
            name="supplierName"
            required
            placeholder="e.g., John Doe Supplies"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />

          <Input
            label="Contacts"
            name="contacts"
            required
            placeholder="e.g., +123456789 or email@example.com"
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue text-white rounded-lg hover:bg-blue/50 transition"
          >
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSupplier;
