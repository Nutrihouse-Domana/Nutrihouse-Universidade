import React from "react";
import Logo from "../assets/NH_universidade_logo.png";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-2xl overflow-hidden w-3/4 max-w-4xl">
        {/* Lado Esquerdo - Logo */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <div className="w-3/4 flex flex-col items-center justify-center p-20 m-5 bg-white">
            <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
            <h1 className="text-3xl font-bold text-black">NutriHouse</h1>
            <p className="text-red-500 text-lg mt-2">Universidade</p>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-1/2 bg-gradient-to-b from-red-500 to-red-400 p-8 flex flex-col justify-center">
          <form className="space-y-4">
            <div>
              <label className="text-white text-sm">E-mail:</label>
              <input
                type="email"
                className="w-full p-2 mt-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div>
              <label className="text-white text-sm">Usuário:</label>
              <input
                type="text"
                className="w-full p-2 mt-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Digite seu usuário"
              />
            </div>

            <div>
              <label className="text-white text-sm">Senha:</label>
              <input
                type="password"
                className="w-full p-2 mt-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition duration-300"
            >
              Login
            </button>

            <p className="text-center text-white mt-4 cursor-pointer hover:underline">
              Esqueceu a senha?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
