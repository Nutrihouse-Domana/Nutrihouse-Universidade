import React from 'react';
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="relative h-screen flex justify-center items-center bg-[#FAF9F7] px-4 overflow-hidden">
      {/* Fundo com as ondas */}
      <div className="absolute inset-0 z-[-1]">
        <div
          className="absolute top-0 left-0 w-full h-[30%] bg-cover bg-left"
          style={{ backgroundImage: "url('../assets/images/background_onda1.jpg')" }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-full h-[30%] bg-cover bg-right"
          style={{ backgroundImage: "url('../assets/images/background_onda2.jpg')" }}
        ></div>
      </div>

      <Login />
    </div>
  );
};

export default LoginPage;
