import StockSvg from '@/public/StockSvg';
import React, { ReactNode } from 'react';
import { Button } from '../ui/button';

interface BlankProps {
  onPress?: () => void;
  text?: string;
  icon?: ReactNode;
  buttonText?: string;
}

const Blank: React.FC<BlankProps> = ({ onPress, text, icon, buttonText }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-4 py-5 h-full w-[40%] max-lg:w-full">
        <StockSvg />
        <div className="flex flex-col gap-2 items-center justify-center">
          <p>{text}</p>
          <Button
            variant="default"
            className="mt-[.5rem] flex items-center gap-3 py-6 max-md:py-5 bg-blue hover:bg-blue/80"
            onClick={onPress}
          >
            {icon}
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blank;
