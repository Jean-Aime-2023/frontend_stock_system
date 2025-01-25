'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Blank from '@/components/common/Blank';
import { BiPlus } from 'react-icons/bi';
import { SuppliersTable } from '@/components/common/Tables/SuppliersTable';
import { suppliers } from '@/data/Suppliers';

const Suppliers = () => {
  const [isExistSupplier, setIsExistSupplier] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const suppliersList = suppliers;
    setIsExistSupplier(suppliersList.length > 0);
  }, []);

  const handleCreatesupplier = () => {
    router.push('/suppliers/new');
  };

  return (
    <div className="w-full">
      {isExistSupplier ? (
        <SuppliersTable />
      ) : (
        <Blank
          onPress={handleCreatesupplier}
          text="There are no Entered Suppliers yet."
          buttonText="Create Suppliers"
          icon={<BiPlus color="#fff" />}
        />
      )}
    </div>
  );
};

export default Suppliers;
