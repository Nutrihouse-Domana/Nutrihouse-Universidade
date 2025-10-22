import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselCard from "../components/CarouselCard";
import carouselData from "../data/carouselData";
import Header from "../components/Header";
import Chatbot from "../assets/images/chatbot.png";

const PAGE_SIZE = 6; // 3x2

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const Home = () => {
  const [username, setUsername] = useState("Usuário");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored && stored !== "undefined") setUsername(stored);
  }, []);

  const pages = chunk(carouselData, PAGE_SIZE);
  const total = pages.length;
  const current = pages[page] ?? [];

  const handleCardClick = (id) => {
    console.log(`Card ${id} clicado`);
    // navigate(`/curso/${id}`);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F7] flex flex-col">
      <Header username={username} />

      {/* ocupa a tela (desconta o header fixo) e centraliza */}
      <section className="min-h-[calc(100vh-100px)] flex justify-center pt-36 lg:pt-40">
        <div className="w-full max-w-[1200px] px-6">
          <div className="relative">

            {/* GRID 3x2 */}
            <div className="grid grid-cols-3 gap-6">
              {current.map((item, i) => (
                <div key={i} className="flex justify-center">
                  <CarouselCard
                    title={item.title}
                    icon={item.image}
                    description={item.description}
                    onClick={() => handleCardClick(item.id)}
                  />
                </div>
              ))}
            </div>

            {/* SETA ESQUERDA – centralizada no meio do grid */}
            <button
              onClick={() => setPage(page > 0 ? page - 1 : total - 1)}
              aria-label="Voltar para a página anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 sm:-ml-24
                         w-12 h-12 rounded-full bg-black/10 hover:bg-black/15
                         flex items-center justify-center text-3xl leading-none text-black-300
                         shadow transition focus:outline-none"
            >
              ‹
            </button>

            {/* SETA DIREITA – centralizada no meio do grid */}
            <button
              onClick={() => setPage(page < total - 1 ? page + 1 : 0)}
              aria-label="Avançar para a próxima página"
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 sm:-mr-24
                         w-12 h-12 rounded-full bg-black/10 hover:bg-black/15
                         flex items-center justify-center text-3xl leading-none text-black-300
                         shadow transition focus:outline-none"
            >
              ›
            </button>
          </div>

          {/* DOTS (fora do stage para não afetar o centro vertical do grid) */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Ir para página ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-all ${
                  page === i ? "w-4 bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Botão flutuante do Chatbot */}
      <button
        onClick={() => console.log('Abrir chatbot')}
        className="fixed bottom-0 right-5 z-50
                  w-16 md:w-20 lg:w-20 aspect-square
                  rounded-full bg-yellow-500 shadow-lg
                  hover:bg-yellow-400 transition
                  grid place-items-center"
        aria-label="Abrir Chatbot"
      >
        <img src={Chatbot} alt="" className="w-7 h-7 md:w-8 md:h-8" />
      </button>
    </main>
  );
};

export default Home;
