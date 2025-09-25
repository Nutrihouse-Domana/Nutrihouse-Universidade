import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Doll from "../assets/images/doll.png";
import Book from "../assets/images/book.png";
import Clock from "../assets/images/clock.png";
import List from "../assets/images/list.png";
import Play from "../assets/images/play-button.png";
import Onda from "../assets/images/background_onda3.jpg";
import Logo from "../assets/logos/logo_rodape.png"; 
import Instagram from "../assets/images/instagram.png";
import Linkedin from "../assets/images/linkedin.png";


const Sobre = () => {
  const [username, setUsername] = useState("Usuário");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored && stored !== "undefined") setUsername(stored);
    document.body.style.overflowY = "auto ";
  }, []);

  return (
    <main className="h-screen bg-[#FAF9F7] min-h-screen flex flex-col overflow-y-scroll(right)">
      {/* Onda no canto superior direito */}
      <div className="absolute top-0 right-0 z-0 flex-grow">
        <img src={Onda} alt="Onda" className="w-48 md:w-70" />
      </div>
      
      <Header username={username} />

      <div className="max-w-5xl mx-auto relative">
        {/* Hero + Missão e Visão lado a lado */}
        <section className="grid md:grid-cols-2 gap-8 items-center my-14">
          {/* Coluna esquerda → Doll */}
          <div className="flex justify-center md:justify-start">
            <img
              src={Doll}
              alt="Aluna estudando"
              className="auto drop-shadow-lg"
            />
          </div>

          {/* Missão e Visão */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-xl font-bold text-[#e14d3a] mb-3">NOSSA MISSÃO</h2>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Promover um ambiente de aprendizado moderno, acessível e integrado
                ao dia a dia da NutriHouse, com foco em qualidade, inovação e
                desenvolvimento contínuo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-xl font-bold text-[#e14d3a] mb-3">NOSSA VISÃO</h2>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Transformar a NutriHouse em um ambiente de aprendizado contínuo e de
                excelência, promovendo o crescimento e a capacitação de nossos colaboradores, 
                fortalecendo nossa cultura e garantindo a melhoria constante dos nossos 
                processos e serviços.
              </p>
            </div>
          </div>
        </section>

        {/* O que você encontra */}
        <section className="bg-white p-8 rounded-xl shadow my-12">
          <h2 className="text-xl md:text-2xl font-bold text-[#e14d3a] mb-10 text-center">
            O QUE ENCONTRAR NA PLATAFORMA
          </h2>
          <div className="space-y-6">
            {/* Item 1 */}
            <div className="flex items-center gap-4">
              <img src={List} alt="Cursos" className="w-10 h-10" />
              <p className="text-gray-700 text-sm md:text-base">
                Cursos e treinamentos organizados
              </p>
            </div>
            {/* Item 2 */}
            <div className="flex items-center gap-4">
              <img src={Play} alt="Vídeos" className="w-10 h-10" />
              <p className="text-gray-700 text-sm md:text-base">
                Vídeos práticos e acessíveis
              </p>
            </div>
            {/* Item 3 */}
            <div className="flex items-center gap-4">
              <img src={Book} alt="Materiais" className="w-10 h-10" />
              <p className="text-gray-700 text-sm md:text-base">
                Materiais de apoio digitais
              </p>
            </div>
            {/* Item 4 */}
            <div className="flex items-center gap-4">
              <img src={Clock} alt="Atualizações" className="w-10 h-10" />
              <p className="text-gray-700 text-sm md:text-base">
                Atualizações frequentes e novos módulos
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Rodapé */}
      <footer className="bg-[#80B5B4] border-t w-screen py-6">
        <div className="grid md:grid-cols-3 gap-16 text-gray-700 w-full justify-items-center">
          {/* Coluna 1 - Logo */}
          <div className="flex flex-col items-center md:items-start">
            <img src={Logo} alt="NutriHouse Logo" className="w-24 mb-5" />
            <span className="text-sm">
              © {new Date().getFullYear()} NutriHouse. Todos os direitos reservados.
            </span>
          </div>

          {/* Coluna 2 - Contato */}
          <div>
            <h4 className="font-bold mb-3">Contato</h4>
            <p>Email: suporte@nutrihouse.com</p>
          </div>

          {/* Coluna 3 - Redes sociais */}
          <div>
            <h4 className="font-bold mb-3">Redes sociais</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/nutrihousequalidade/" target="_blank" rel="noopener noreferrer">
                <img src={Instagram} alt="Instagram" className="w-8 h-8" />
              </a>
              <a href="https://www.linkedin.com/company/nutrihouse/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                <img src={Linkedin} alt="LinkedIn" className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Sobre;
