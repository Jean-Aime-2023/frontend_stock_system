import React, { useState } from 'react';
import Input from './Input';
import AuthText from './AuthText';

interface ResetPasswordFormProps {
  emailOrPhone: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  emailOrPhone,
}) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert(`Password reset successfully for ${emailOrPhone}`);
  };

  return (
      <div className="flex items-center flex-col justify-center w-full">
        <AuthText
          title="Reset Password"
          text="Enter and confirm your new password to complete the process."
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full mt-10">
          <Input
            label="New Password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            required
            type="password"
            placeholder="Enter new password"
          />
          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            name="confirmPassword"
            required
            type="password"
            placeholder="Confirm new password"
          />
          <button className="w-full bg-blue text-white py-3 px-4 mb-8 rounded-md hover:bg-blue-600">
            Reset Password
          </button>
        </form>
      </div>
  );
};

export default ResetPasswordForm;
