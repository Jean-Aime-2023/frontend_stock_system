'use client';

import ForgotPasswordForm from '@/components/common/ForgotPasswordForm';
import OTPVerificationForm from '@/components/common/OTPVerificationForm';
import ResetPasswordForm from '@/components/common/ResetPasswordForm';
import React, { useState } from 'react';

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleNext = (data: string) => {
    setEmailOrPhone(data);
    setStep(step + 1);
  };
  return (
    <div>
      {step === 1 && <ForgotPasswordForm onNext={handleNext} />}
      {step === 2 && (
        <OTPVerificationForm
          onNext={() => setStep(3)}
          emailOrPhone={emailOrPhone}
        />
      )}
      {step === 3 && <ResetPasswordForm emailOrPhone={emailOrPhone} />}
    </div>
  );
};

export default ResetPassword;
