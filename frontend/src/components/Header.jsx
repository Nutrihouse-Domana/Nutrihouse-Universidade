import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logos/logo_preta.png";
import User from "../assets/images/user.png";
import ExitIcon from "../assets/images/exit.png"; 

const Header = () => {
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(
      storedUsername && storedUsername !== "undefined" ? storedUsername : "Usuário"
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username"); 
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#FAF9F7] shadow-sm">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-8 py-4">
        {/* Logo à esquerda */}
        <div className="flex items-center">
          <img src={Logo} alt="NutriHouse" className="h-10 w-auto" />
        </div>

        {/* Direita: NAV + Saudações lado a lado */}
        <div className="flex items-center gap-10">
          {/* Navbar */}
          <nav className="flex items-center gap-6">
            {/* Link CURSOS */}
            <div className="relative">
              <Link
                to="/home"
                className={`text-black font-medium transition hover:text-yellow-600 ${
                  location.pathname === "/home" ? "text-yellow-600 font-semibold" : ""
                }`}
              >
                CURSOS
              </Link>
              {location.pathname === "/home" && (
                <div className="absolute left-0 w-full h-1 bg-yellow-400 rounded mt-1" />
              )}
            </div>

            {/* Link SOBRE */}
            <div className="relative">
              <Link
                to="/sobre"
                className={`text-black font-medium transition hover:text-yellow-600 ${
                  location.pathname === "/sobre" ? "text-yellow-600 font-semibold" : ""
                }`}
              >
                SOBRE
              </Link>
              {location.pathname === "/sobre" && (
                <div className="absolute left-0 w-full h-1 bg-yellow-400 rounded mt-1" />
              )}
            </div>
          </nav>

          {/* Saudação e menu de logout */}
          <div className="relative flex items-center gap-2">
            <span
              className="text-black cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)} 
            >
              Olá, <strong>{username}</strong>
            </span>
            <img src={User} alt="User" className="h-5 w-5 cursor-pointer" />
            
            {/* logout */}
            {isMenuOpen && (
              <div className="absolute right-0 top-1 bg-transparent w-60 p-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-5 text-black hover:bg-gray-400 flex items-center gap-2">
                  <img src={ExitIcon} alt="Exit" className="h-6 w-6" /> {/* Ícone de saída */}
                  Encerrar Sessão
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



