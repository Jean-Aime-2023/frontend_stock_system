'use client';

import Blank from '@/components/common/Blank';
import { useRouter } from 'next/navigation';
import React from 'react';

const Settings = () => {
  const router = useRouter();
  return (
    <Blank
      text="Coming soon!"
      buttonText="Go back home"
      onPress={() => router.push('/stock')}
    />
  );
};

export default Settings;
