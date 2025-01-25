'use client'
import Blank from '@/components/common/Blank';
import { LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Orders = () => {
  const router = useRouter()
  return (
    <Blank
      onPress={()=>router.push('/stock')}
      text="No orders available yet."
      buttonText="Go to stock"
      icon={<LayoutDashboard className="h-4 w-4" />}
    />
  );
};

export default Orders;
