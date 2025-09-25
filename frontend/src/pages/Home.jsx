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
    localStorage.removeItem("username"); 
    navigate("/"); 
  };

  return (
    <main className=" overflow-hidden bg-[#FAF9F7] flex flex-col min-h-screen pt-[80px]">
      <Header username={username} setIsMenuOpen={setIsMenuOpen} />

      <section className="flex flex-col justify-center items-center flex-1 relative">
        <div className="w-full max-w-[1200px] px-6 flex flex-col justify-between h-full pt-10">
          <Outlet />

          {/* Grid de cards */}
          <div className="relative flex-1 flex flex-col justify-center items-center pt-10">
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

            {/* Setas nas extremidades da tela */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              {/* Seta esquerda */}
              <button
                onClick={() => setPage(page > 0 ? page - 1 : total - 1)}
                aria-label="Voltar para a página anterior"
                className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-black/15 flex items-center justify-center text-3xl text-black shadow transition"
              >
                ‹
              </button>

              {/* Seta direita */}
              <button
                onClick={() => setPage(page < total - 1 ? page + 1 : 0)}
                aria-label="Avançar para a próxima página"
                className="absolute right-[-2rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-black/15 flex items-center justify-center text-3xl text-black shadow transition"
              >
                ›
              </button>
            </div>
          </div>

          {/* Paginação */}
          <div className="flex justify-center items-center mb-2">
            <button
              onClick={() => setPage(page > 0 ? page - 1 : total - 1)}
              className="px-4 py-2 mx-2 border rounded"
            >
              Anterior
            </button>
            <span className="text-lg">{page + 1} / {total}</span>
            <button
              onClick={() => setPage(page < total - 1 ? page + 1 : 0)}
              className="px-4 py-2 mx-2 border rounded"
            >
              Próxima
            </button>
          </div>
        </div>
      </section>

      {/* Tooltip do chatbot */}
      {showTooltip && (
        <div className="fixed bottom-[110px] right-16 z-50 w-20 flex justify-center">
          <div className="relative bg-black text-white text-sm px-4 py-2 rounded shadow-lg">
            Funcionalidade ainda não disponível
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
