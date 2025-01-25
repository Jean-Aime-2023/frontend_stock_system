'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StockTable } from '@/components/common/Tables/StockTable';
import Blank from '@/components/common/Blank';
import { tableData } from '@/data/Stock';

const Stock = () => {
  const [isExistProduct, setIsExistProduct] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const products = tableData;
    setIsExistProduct(products.length > 0);
  }, []);

  const handleCreateProduct = () => {
    router.push('/products/new');
  };

  return (
    <div className="w-full">
      {isExistProduct ? (
        <StockTable />
      ) : (
        <Blank
          onPress={handleCreateProduct}
          text="No products available yet. Start by creating a new product!"
          buttonText="Create Product"
        />
      )}
    </div>
  );
};

export default Stock;
