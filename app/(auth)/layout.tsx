import React from 'react';
import img from '@/public/assets/authimg.jpg';
import Logo from '@/public/assets/Logo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${img.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="flex items-center justify-center min-h-screen w-full overflow-auto bg-no-repeat"
    >
      <div className="bg-white my-20 px-20 max-lg:px-14 max-md:px-10 max-sm:px-7 md:py-16 py-5 flex items-center justify-center flex-col gap-5 rounded-xl border shadow w-[50%] xl:px-[8rem] h-fit max-xl:w-[90%]">
        <Logo height="80" width="80" />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
