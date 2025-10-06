import React from "react";
import { useParams, useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar_VideoPage.jsx";

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

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
