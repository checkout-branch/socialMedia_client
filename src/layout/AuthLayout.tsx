// src/layout/AuthLayout.tsx
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen ">
      {/* Left side (image) */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center bg-gray-200"
        style={{
          backgroundImage: `url('https://th.bing.com/th/id/OIP.ZpaC6NT1Rx3oJuQsHVZfqwHaEo?w=302&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7')`,
        }}
      ></div>

      {/* Right side (content, forms) */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-800">
        <div className="w-full max-w-md px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
