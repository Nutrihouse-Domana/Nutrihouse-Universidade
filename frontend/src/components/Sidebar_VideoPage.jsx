import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Sidebar = ({ showButton = true }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  const modulos = [
    "Aula 01 – Bem Vindo",
    "Aula 02 – Liderança",
    "Aula 03 – Desenvolvimento",
    "Aula 04 – Propósito",
    "Aula 05 – Estilos",
    "Aula 06 – Bônus",
  ];

  const handleVoltar = () => {
    if (location.pathname.includes("/materiais")) {
      navigate(`/video/${id || 1}`); // volta para o vídeo correspondente
    } else {
      navigate("/home"); // volta para home quando estiver em vídeo
    }
  };

  return (
    <aside className="sidebar w-72 bg-gradient-to-b from-[#B95758] to-[#e14d3a] text-white p-6 fixed top-0 left-0 h-full flex flex-col justify-between shadow-lg">
      {/* Cabeçalho com seta e tooltip */}
      <div className="flex items-center gap-3 mb-6 relative">
        <div
          className="relative"
          onMouseEnter={() => setMostrarTooltip(true)}
          onMouseLeave={() => setMostrarTooltip(false)}
        >
          <button
            onClick={handleVoltar}
            aria-label="Voltar"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#ffffff22] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-black hover:text-yellow-300 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Tooltip “Voltar” */}
          {mostrarTooltip && (
            <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-md shadow-md animate-fade-in select-none whitespace-nowrap">
              {location.pathname.includes("/materiais")
                ? "Voltar ao vídeo"
                : "Voltar à Home"}
            </div>
          )}
        </div>

        <h2 className="text-lg font-bold uppercase tracking-wide select-none">
          MÓDULOS
        </h2>
      </div>

      {/* Lista de módulos com altura calculada */}
      <ul
        className="
          flex-1 overflow-y-auto pr-2 space-y-3 text-sm
          scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent
          "
        style={{
          height: "calc(100vh - 180px)", 
        }}
      >
        {modulos.map((modulo, i) => (
          <li
            key={i}
            onClick={() => navigate(`/video/${i + 1}`)}
            className="hover:text-yellow-200 cursor-pointer transition"
          >
            {modulo}
          </li>
        ))}
      </ul>

      {/* Botão Material de Apoio */}
      {showButton && (
        <button
          onClick={() => navigate(`/materiais/${id || 1}`)}
          className="w-full bg-white text-[#B95758] font-semibold py-2 rounded-md hover:bg-gray-100 transition shadow-sm mt-4"
        >
          Material de Apoio
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
