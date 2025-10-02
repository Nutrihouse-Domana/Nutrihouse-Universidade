import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CarouselCard from "../components/CarouselCard";
import carouselData from "../data/carouselData";
import Header from "../components/Header";
import Chatbot from "../components/Chatbot";


const PAGE_SIZE = 6;

const chunk = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Home = () => {
  const [username, setUsername] = useState("Usuário");
  const [page, setPage] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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


  return (
    <main className="bg-[#FAF9F7] flex flex-col min-h-screen pt-[70px]">
      <Header username={username} setIsMenuOpen={setIsMenuOpen} />

      <section className="relative flex flex-col justify-center items-center flex-1">
        <div className="w-full max-w-[1150px] px-6 flex flex-col justify-between h-full pt-10">
          <Outlet />

          {/* Grid de cards */}
          <div className="relative flex-1 flex flex-col justify-center items-center pt-4">
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {current.map((item) => (
                <div key={item.id} className="flex justify-center h-full">
                  <CarouselCard
                    id={item.id}
                    title={item.title}
                    icon={item.image}
                    description={item.description}
                    onClick={() => handleCardClick(item.id)}
                    className="h-[180px]"
                  />
                </div>
              ))}
            </div>

            {/* Setas de navegação */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              {/* Seta esquerda */}
              <button
                onClick={() => setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : total - 1))}
                disabled={page === 0}
                aria-label="Voltar para a página anterior"
                className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-black/15 flex items-center justify-center text-3xl text-black shadow transition disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                ‹
              </button>

              {/* Seta direita */}
              <button
                onClick={() => setPage((prevPage) => (prevPage < total - 1 ? prevPage + 1 : 0))}
                disabled={page === total - 1}
                aria-label="Avançar para a próxima página"
                className="absolute right-[-2rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-black/15 flex items-center justify-center text-3xl text-black shadow transition disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>

          {/* Paginação */}
          <div className="w-full h-[100px] flex items-center justify-center">
            <div className="paginacao-container space-x-2">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Ir para a página ${i + 1}`}
                  className={`w-10 h-10 min-w-[40px] text-center flex items-center justify-center rounded-md font-medium
                    ${page === i
                      ? "bg-yellow-500 text-white border-yellow-500 shadow-md"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

        </div> 
      </section> 

      {/* Chatbot */}
      <Chatbot />
    </main>
  );
};


export default Home;