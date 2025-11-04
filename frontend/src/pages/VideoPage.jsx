import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const SERVER_HOST = "http://NHBD02"; 
const VideoPage = () => {
  const { id } = useParams(); 
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchedVideos, setWatchedVideos] = useState(() => {
    const stored = localStorage.getItem("watchedVideos");
    return stored ? JSON.parse(stored) : {};
  });
  const videoRef = useRef(null);

  useEffect(() => {
    async function carregarVideos() {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/${id}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setVideos(data);
          if (data.length > 0) setSelectedVideo(data[0]);
        } else {
          console.error("Resposta inesperada da API:", data);
        }
      } catch (err) {
        console.error("Erro ao carregar vídeos:", err);
      } finally {
        setLoading(false);
      }
    }

    carregarVideos();
  }, [id]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();

    }
  }, [selectedVideo]);

  const handleVideoEnded = () => {
    if (selectedVideo) {
      const updated = { ...watchedVideos, [selectedVideo.id]: true };
      setWatchedVideos(updated);
      localStorage.setItem("watchedVideos", JSON.stringify(updated));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar 
          videos={videos}
          setSelectedVideo={setSelectedVideo}
          watchedVideos={watchedVideos}
        />
        <div className="flex-1 ml-72 p-8 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            {selectedVideo ? selectedVideo.titulo : "Carregando vídeo..."}
          </h1>
        
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 ml-72 p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Nenhum vídeo encontrado para este curso 
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar dinâmica */}
      <Sidebar videos={videos} setSelectedVideo={setSelectedVideo} />

      {/* Conteúdo principal */}
      <div className="flex-1 ml-72 p-8 flex flex-col items-center">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {selectedVideo ? selectedVideo.titulo : "Carregando vídeo..."}
        </h1>

        {/* Player principal */}
        <div className="w-[80%] max-w-5xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden mb-6">
          {selectedVideo && (
            <video
              ref={videoRef}
              key={selectedVideo.url}
              className="w-full h-full object-contain"
              controls
            >
              <source src={selectedVideo.url} type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          )}
        </div>

      </div>
    </div>
  );
};

export default VideoPage;
