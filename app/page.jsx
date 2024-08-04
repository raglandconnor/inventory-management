import React from 'react';
import { UserAuthForm } from './components/user-auth-form';

const Login = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-36">
        Inventory Management
      </h1>
      <UserAuthForm className="w-96" />
    </div>
  );
};

export default Login;
