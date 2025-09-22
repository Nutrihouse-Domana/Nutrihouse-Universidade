import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Sobre = () => {
  const [username, setUsername] = useState("Usuário");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored && stored !== "undefined") setUsername(stored);
  }, []);

  return (
    <main 
      className="bg-[#FAF9F7] pt-24 px-8 min-h-screen overflow-y-auto">
      {/* Header fixo */}
      <Header username={username} />

      <div className="bg-[#FAF9F7] max-w-6xl mx-auto">
        {/* Hero / Capa */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-24 px-6 text-center rounded-lg shadow-xl">
          <h1 className="text-5xl font-bold mb-8">Universidade NutriHouse</h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Um espaço digital desenvolvido pela <strong>NutriHouse</strong> para
            automatizar e facilitar o acesso a conteúdos de aprendizado, treinamentos
            e capacitação dos nossos colaboradores e parceiros.
          </p>
        </section>

        {/* Seção Missão e Visão */}
        <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
          <div className="bg-[#e14d3a] rounded-2xl hover:shadow-2xl transition-all duration-300 p-8">
            <h2 className="text-3xl font-poppins text-gray-800 mb-4">NOSSA MISSÃO</h2>
            <p className="text-white leading-relaxed">
              Promover um ambiente de aprendizado moderno, acessível e integrado ao
              dia a dia da NutriHouse, reforçando o compromisso com qualidade,
              inovação e o desenvolvimento contínuo de nossas equipes.
            </p>
          </div>
          <div className="bg-[#e14d3a] rounded-2xl  hover:shadow-2xl transition-all duration-300 p-8">
            <h2 className="text-3xl font-poppins text-gray-800 mb-4">NOSSA VISÃO</h2>
            <p className="text-white leading-relaxed">
              Ser referência em educação corporativa na área de alimentação, atuando
              como um hub central de conhecimento que fortalece pessoas, processos e a
              excelência em nossos serviços.
            </p>
          </div>
        </section>

        {/* Seção O que você encontra */}
        <section className="bg-[#FAF9F7] py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-poppins text-gray-800 mb-8">
              O QUE VOCÊ ENCONTRA NA PLATAFORMA
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
              <div className="bg-[#e14d3a] rounded-xl shadow p-6 hover:shadow-2xl transition-all duration-300">
                <p className="text-white">Cursos e treinamentos organizados</p>
              </div>
              <div className="bg-[#e14d3a] rounded-xl shadow p-6 hover:shadow-2xl transition-all duration-300">
                <p className="text-white">Conteúdos em vídeo práticos e acessíveis</p>
              </div>
              <div className="bg-[#e14d3a] rounded-xl shadow p-6 hover:shadow-2xl transition-all duration-300">
                <p className="text-white">Materiais de apoio e guias digitais</p>
              </div>
              <div className="bg-[#e14d3a] rounded-xl shadow p-6 hover:shadow-2xl transition-all duration-300">
                <p className="text-white">Atualizações frequentes e novos módulos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de evolução */}
        <section className="max-w-4xl mx-auto py-16 px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Em constante evolução
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            A Universidade NutriHouse está em fase de desenvolvimento e continuará
            crescendo com novos conteúdos e funcionalidades. Nosso propósito é
            acompanhar as necessidades da empresa e ser um espaço de referência para
            aprendizado e capacitação contínua.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Sobre;
