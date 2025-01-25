'use client';
import AuthText from '@/components/common/AuthText';
import Input from '@/components/common/Input';
import Link from 'next/link';
import React, { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const loginMutation = useLogin();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Internal server error');
    }
  };

  return (
    <div className="flex items-center flex-col justify-center w-full">
      <AuthText
        title="Welcome Back"
        text="Manage your stock with accurate calculations with budget tracking"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-10">
        {/* Email or Phone Number Input */}
        <Input
          label="Email or Phone"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          required
          placeholder="eg: ngabonz....@gmail.com or 078..."
        />
        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
          required
          placeholder="Enter your password"
        />
        <p className="self-end pb-6">
          Forgot password?{' '}
          <Link className="text-blue" href={'/resetpassword'}>
            Reset it.
          </Link>
        </p>
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className={`w-full text-white btn mb-14 ${
            loginMutation.isPending ? 'bg-gray-400' : 'bg-blue'
          }`}
        >
          {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;