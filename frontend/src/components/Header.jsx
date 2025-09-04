import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logos/logo_preta.png";
import User from "../assets/images/user.png"

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername && storedUsername !== "undefined" ? storedUsername : "Usuário");
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#FAF9F7] shadow-sm">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-8 py-4">
        {/* Logo à esquerda */}
        <div className="flex items-center">
          <img src={Logo} alt="NutriHouse" className="h-10 w-auto" />
        </div>

        {/* Direita: NAV + Saudações lado a lado */}
        <div className="flex items-center gap-10">
          {/* Navbar encostada na saudação */}
          <nav className="flex items-center gap-6">
            <div className="relative">
              <a
                href="#"
                className="text-black font-medium hover:text-yellow-600"
              >
                CURSOS
              </a>
              {/* sublinhado do item ativo */}
              <div className="absolute left-0 w-full h-1 bg-yellow-400 rounded mt-1" />
            </div>

            <a
              href="#"
              className="text-black font-medium hover:text-yellow-600"
            >
              SOBRE
            </a>
          </nav>

          {/* Saudação ao usuário ao lado do menu */}
          <div className="flex items-center gap-2">
            <span className="text-black">
              Olá, <strong>{username}</strong>
            </span>
             <img src={User} alt="User" className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
