import React, { useState } from 'react';
import Input from './Input';
import AuthText from './AuthText';

interface ForgotPasswordFormProps {
  onNext: (emailOrPhone: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onNext }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrPhone(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(emailOrPhone);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <AuthText
        title="Forgot Password"
        text="Reset your password by entering your email or phone number to get an OTP."
      />
      <div className="flex flex-col gap-2 w-full mt-10">
        <Input
          label="Phone Number or Email"
          value={emailOrPhone}
          onChange={handleInputChange}
          name="emailOrPhone"
          required
          placeholder="e.g., 078..., 073..., ngab...@gmail.com"
        />
        <button className="w-full bg-blue text-white py-3 px-4 rounded-md hover:bg-blue-600 mb-8">
          Send OTP
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
