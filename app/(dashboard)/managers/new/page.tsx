'use client';
import Input from '@/components/common/Input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewManager = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push('/managers');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.includes('@ourstock.com')) {
      setEmail(e.target.value + '@ourstock.com');
    } else {
      setEmail(e.target.value);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white w-[80%] flex flex-col gap-6 rounded-[20px] p-10 py-20 px-[8rem]">
        <div>
          <h1 className="text-[24px] font-semibold">Create Stock / Section Manager</h1>
          <p className="text-[#667085] py-2">
            Fill in the below fields details about stock or section managers
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            required
            placeholder="e.g., John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <Input
              label="Email"
              name="email"
              required
              placeholder="e.g., john.doe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className='h-full border-2 border-gray-200 rounded-lg py-4 px-2'>@ourstock.com</span>
          </div>

          <Input
            label="Temporary Password"
            name="temporaryPassword"
            required
            placeholder="e.g., temporary123"
            value={temporaryPassword}
            onChange={(e) => setTemporaryPassword(e.target.value)}
            type="password"
          />

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue text-white rounded-lg hover:bg-blue/50 transition"
          >
            Add Manager
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewManager;
