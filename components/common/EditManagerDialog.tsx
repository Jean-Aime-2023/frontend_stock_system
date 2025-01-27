'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Input from './Input';

interface EditManagerDialogProps {
  manager: {
    fullName: string;
    email: string;
    password?: string;
  };
  onSave: (updatedManager: {
    fullName: string;
    email: string;
    password: string;
  }) => void;
}

export const EditManagerDialog: React.FC<EditManagerDialogProps> = ({
  manager,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    fullName: manager.fullName,
    email: manager.email,
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center rounded-full gap-2 bg-blue text-white hover:bg-blue/75">
          Edit Manager
        </Button>
      </DialogTrigger>
      <DialogContent className="px-12 py-6">
        <DialogHeader>
          <DialogTitle>Edit Manager Details</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSave}>
          <Input
            label="Full Name"
            name="fullName"
            required
            placeholder="e.g., John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <div className="flex items-center gap-2">
            <Input
              label="Email"
              name="email"
              required
              placeholder="e.g., john.doe"
              value={formData.email.split('@')[0]}
              onChange={(e) =>
                handleInputChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: `${e.target.value}@ourstock.com`,
                  },
                })
              }
            />
            <span className="border-2 border-gray-200 rounded-lg py-4 px-2">
              @ourstock.com
            </span>
          </div>

          <Input
            label="Password"
            name="password"
            type="password"
            required
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <div className="flex gap-4 mt-4">
            <Button
              type="submit"
              className="bg-blue text-white flex-1 py-4 hover:bg-blue/80"
            >
              Save
            </Button>
            <Button
              type="button"
              className="bg-gray-200 text-black hover:bg-gray-300 flex-1 py-4"
              onClick={() =>
                setFormData({
                  fullName: manager.fullName,
                  email: manager.email,
                  password: '',
                })
              }
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
