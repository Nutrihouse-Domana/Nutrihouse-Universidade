import React from "react";
import Logo from "../assets/logos/logo_preta.png";

const Header = () => {
  return (
 <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="NutriHouse" className="h-20 w-auto" />
          
        </div>

        {/* Navegação */}
        <nav className="flex space-x-2 items-center">
          <div className="relative">
            <a href="#" className="text-black font-medium hover:text-yellow-600">
              CURSOS
            </a>
            <div className="absolute left-0 w-full h-1 bg-yellow-400 rounded mt-1" />
          </div>
          <a href="#" className="text-black font-medium hover:text-yellow-600">
            SOBRE
          </a>
        </nav>

        {/* Usuário */}
        <div className="flex items-center space-x-2">
          <span className="text-black">
            Olá, <strong>Usuário</strong>
          </span>
          <div className="w-6 h-6 bg-black rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
