import React from 'react';

const AuthText = ({ title, text }: { title?: string; text?: string }) => {
  return (
    <div className='text-center'>
      <h1 className="text-[#070339] font-semibold text-2xl">{title}</h1>
      <p className="text-[#676767] py-2">{text}</p>
    </div>
  );
};

export default AuthText;
