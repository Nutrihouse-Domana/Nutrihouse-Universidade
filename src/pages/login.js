import React from 'react';
import Logo from '../assets/NH_universidade_logo.png';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" flex bg-white shadow-lg rounded-2xl overflow-hidden w-2/4 max-w-4x1 h-3/4 max-h-4x1">
        {/* Lado Esquerdo - Logo */}
        <div className="w-3/4  flex flex-col items-center justify-center p-20 m-5 bg-white ">
          <img 
            src={Logo} 
            alt="Logo" 
            className=""
          />
          
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-2/3 bg-gradient-to-b from-red-500 to-red-400 p-8 flex flex-col justify-center">
          <form className="space-y-4">
            <div>
              <label className="text-white text-sm">Usuário:</label>
              <input 
                type="user" 
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
              Esqueceu a senha
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
