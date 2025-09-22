import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CarouselCard from "../components/CarouselCard";
import carouselData from "../data/carouselData";
import Header from "../components/Header";
import Chatbot from "../assets/images/chatbot.png";

const PAGE_SIZE = 6;

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const Home = () => {
  const [username, setUsername] = useState("Usuário");
  const [page, setPage] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored && stored !== "undefined") setUsername(stored);
  }, []);

  const pages = chunk(carouselData, PAGE_SIZE);
  const total = pages.length;
  const current = pages[page] ?? [];

  const handleCardClick = (id) => {
    navigate(`/videos/${id}`);
  };

  const handleChatbotClick = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000); // Esconde após 3s
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove o usuário do localStorage
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <main className="min-h-screen bg-[#FAF9F7] flex flex-col">
      <Header username={username} setIsMenuOpen={setIsMenuOpen} />

      {/* Menu de Logout */}
      {isMenuOpen && (
        <div className="absolute right-5 top-16 bg-white shadow-lg rounded-md w-40 p-2">
          <button onClick={handleLogout} className="w-full text-left p-2 hover:bg-gray-200">
            Encerrar Sessão
          </button>
        </div>
      )}

      <section className="min-h-[calc(100vh-100px)] flex justify-center pt-36 lg:pt-40">
        <div className="w-full max-w-[1200px] px-6">
          <div className="relative">
            <Outlet />
            <div className="grid grid-cols-3 gap-6">
              {current.map((item) => (
                <div key={item.id} className="flex justify-center">
                  <CarouselCard
                    id={item.id}
                    title={item.title}
                    icon={item.image}
                    description={item.description}
                    onClick={() => handleCardClick(item.id)}
                  />
                </div>
              ))}
            </div>

            {/* Seta esquerda */}
            <button
              onClick={() => setPage(page > 0 ? page - 1 : total - 1)}
              aria-label="Voltar para a página anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 sm:-ml-20 w-12 h-12 rounded-full hover:bg-black/15 flex items-center justify-center text-3xl leading-none text-black-300 shadow transition focus:outline-none"
            >
              ‹
            </button>

            {/* Seta direita */}
            <button
              onClick={() => setPage(page < total - 1 ? page + 1 : 0)}
              aria-label="Avançar para a próxima página"
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 sm:-mr-20 w-12 h-12 rounded-full hover:bg-black/15 flex items-center justify-center text-3xl leading-none text-black-300 shadow transition focus:outline-none"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Tooltip do chatbot */}
      {showTooltip && (
        <div className="fixed bottom-[110px] right-16 z-50 w-20 flex justify-center">
          {/* Balão de mensagem */}
          <div className="relative bg-black text-white text-sm px-4 py-2 rounded shadow-lg">
            Funcionalidade ainda não disponível

            {/* Triângulo da cauda */}
            <div className="absolute bottom-[-6px] right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-black" />
          </div>
        </div>
      )}

      {/* Botão flutuante do Chatbot */}
      <button
        onClick={handleChatbotClick}
        className="fixed bottom-0 right-5 z-50 w-16 md:w-20 lg:w-20 aspect-square rounded-full bg-yellow-500 shadow-lg hover:bg-yellow-400 transition grid place-items-center"
        aria-label="Abrir Chatbot"
      >
        <img src={Chatbot} alt="" className="w-7 h-7 md:w-8 md:h-8" />
      </button>
    </main>
  );
};

export default Home;
