import React, { useState } from 'react';
import AuthText from './AuthText';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

interface OTPVerificationFormProps {
  onNext: () => void;
  emailOrPhone: string;
}

const OTPVerificationForm: React.FC<OTPVerificationFormProps> = ({
  onNext,
  emailOrPhone,
}) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <AuthText
        title="Verify OTP"
        text={`An OTP has been sent to ${emailOrPhone}. Please enter it below to continue.`}
      />
      <div className="flex flex-col gap-2 w-full mt-4">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>
        <button className="w-full bg-blue text-white py-3 px-4 rounded-md hover:bg-blue-600 my-8">
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default OTPVerificationForm;
