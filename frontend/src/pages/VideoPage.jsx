import React from "react";
import { useParams } from "react-router-dom";


const VideoPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar fixa */}
      <div
        className="w-72 text-white p-6 fixed top-0 left-0 h-full"
        style={{ background: "linear-gradient(to bottom, #B95758, #e14d3a)" }}
      >
        <h2 className="text-lg font-semibold mb-6 uppercase">MÓDULOS</h2>
        <ul className="space-y-4">
          <li>Aula 01 - Bem Vindo</li>
          <li>Aula 02 - Liderança</li>
          <li>Aula 03 - Desenvolvimento</li>
          <li>Aula 04 - Propósito</li>
          <li>Aula 05 - Estilos</li>
          <li>Aula 06 - Bônus</li>
        </ul>

        <button className="mt-10 w-full bg-white text-red-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition">
          Material de Apoio
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 ml-72 p-8 flex flex-col items-center">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Formação em Liderança (ID: {id})
        </h1>

        {/* Player gigante, quase tela cheia */}
        <div className="w-full h-[70vh] max-h-[80vh] aspect-video bg-black rounded-xl shadow-2xl overflow-hidden mb-8">
          <video className="w-full h-full object-contain" controls>
            <source src="" type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        </div>

        {/* Informações do módulo */}
        <div className="w-full p-3 bg-gray-100 rounded-lg shadow text-center">
          <p className="text-lg font-medium">01 - Bem Vindo ao Curso</p>
          <p className="text-sm text-gray-500">Duração: --</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
