'use client';
import AuthText from '@/components/common/AuthText';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRegister, useSendActivationEmail } from '@/hooks/useAuth';
import { toast } from 'sonner';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  // Extract mutation from the useRegister hook
  const registerMutation = useRegister();
  const sendActivationEmailMutation = useSendActivationEmail()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    try {
      const response = await registerMutation.mutateAsync({
        fullName: formData.fullName,
        userName: formData.username,
        email: formData.email,
        password: formData.password
      })
      
      if(response.success){
        await sendActivationEmailMutation.mutateAsync({ email: formData.email });
        toast.success(response.message)
        router.push('/verification')
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.log('Error', error)
      toast.error('Internal server error')
    }
  };

  return (
    <div className="flex items-center flex-col justify-center w-full">
      <AuthText
        title="Welcome Back"
        text="Manage your stock with accurate calculations with budget tracking"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full mt-10">
        <Input
          label="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          name="fullName"
          required
          placeholder="eg: NGABONZIZA Antoine"
        />
        <Input
          label="Username"
          value={formData.username}
          onChange={handleInputChange}
          name="username"
          required
          placeholder="eg: Antonio"
        />
        <Input
          label="Phone Number or Email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          required
          placeholder="eg: 078...., 073.., ngab....@gmail.com"
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
          required
          placeholder="........"
        />
        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
          required
          placeholder="........"
        />
        <button
          type="submit"
          disabled={registerMutation.isPending || sendActivationEmailMutation.isPending}
          className={`w-full text-white btn mb-10 ${registerMutation.isPending || sendActivationEmailMutation.isPending ? 'bg-gray-400' : 'bg-blue'}`}
        >
          {registerMutation.isPending || sendActivationEmailMutation.isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;