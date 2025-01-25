'use client';
import React, { useState } from 'react';
import NoSection from '@/components/common/NoSection';
import CreateStock from '@/components/common/CreateStock';
import CreateStockManager from '@/components/common/CreateStockManager';
import { StockTable } from '@/components/common/Tables/StockTable';

const StockSections = () => {
  const [currentStep, setCurrentStep] = useState<
    'noSection' | 'createStock' | 'createManager' | 'success'
  >('noSection');

  const handleCreateStock = () => setCurrentStep('createStock');
  const handleManagerOption = (option: 'myself' | 'manager') => {
    if (option === 'myself') {
      setCurrentStep('success');
    } else {
      setCurrentStep('createManager');
    }
  };
  const handleSuccess = () => setCurrentStep('success');

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
      {currentStep === 'noSection' && (
        <NoSection onCreateStock={handleCreateStock} />
      )}
      {currentStep === 'createStock' && (
        <CreateStock onManagerOption={handleManagerOption} />
      )}
      {currentStep === 'createManager' && (
        <CreateStockManager onSuccess={handleSuccess} />
      )}
      {currentStep === 'success' && (
        <div className="w-full">
          <StockTable />
        </div>
      )}
    </div>
  );
};

export default StockSections;
