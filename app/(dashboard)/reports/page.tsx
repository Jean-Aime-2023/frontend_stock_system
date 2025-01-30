'use client'

import Blank from '@/components/common/Blank';
import { useRouter } from 'next/navigation';
import React from 'react';

const Reports = () => {
  const router = useRouter();
  return (
    <Blank
      text="No Reports available yet!"
      buttonText="Go back home"
      onPress={() => router.push('/stock')}
    />
  );
};

export default Reports;
