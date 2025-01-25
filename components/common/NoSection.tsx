import StockSvg from '@/public/StockSvg';
import React from 'react';
import { Button } from '../ui/button';
import { BiPlus } from 'react-icons/bi';

interface NoSectionProps {
  onCreateStock: () => void;
}

const NoSection: React.FC<NoSectionProps> = ({ onCreateStock }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-5 h-full w-[40%] max-lg:w-full">
      <StockSvg />
      <div className="flex flex-col gap-2 items-center justify-center">
        <p>There are no Created Stocks so far.</p>
        <Button
          variant="default"
          className="mt-[.5rem] flex items-center gap-3 py-6 max-md:py-5 bg-blue hover:bg-blue/80"
          onClick={onCreateStock}
        >
          <BiPlus color="#fff" />
          Create Stock / Section
        </Button>
      </div>
    </div>
  );
};

export default NoSection;
