import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Sidebar = ({
  showButton = true,
  modulos = [],
  videos = [],
  setSelectedVideo,
  watchedVideos = {},
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [moduloAberto, setModuloAberto] = useState(null);

  const handleVoltar = () => {
    if (location.pathname.includes("/materiais")) {
      navigate(`/video/${id || 1}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <aside className="sidebar w-72 bg-[linear-gradient(135deg,_#B95758,_#e14d3a)] text-white p-6 fixed top-0 left-0 h-full flex flex-col justify-between shadow-lg">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6 relative">
        <div
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
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

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

      {/* Lista de módulos ou vídeos */}
      <ul
        className="flex-1 overflow-y-auto pr-2 space-y-3 text-sm scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent"
        style={{ height: "calc(100vh - 180px)" }}
      >
        {modulos.length > 0 ? (
          modulos.map((mod) => (
            <li key={mod.id}>
              <div
                className="flex justify-between items-center cursor-pointer font-semibold hover:text-yellow-200"
                onClick={() =>
                  setModuloAberto(moduloAberto === mod.id ? null : mod.id)
                }
              >
                <span className="truncate">{mod.titulo}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 transform transition-transform ${
                    moduloAberto === mod.id ? "rotate-90" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {moduloAberto === mod.id && (
                <ul className="pl-3 mt-2 space-y-1">
                  {mod.videos.map((v) => (
                    <li
                      key={v.id}
                      onClick={() => setSelectedVideo(v)}
                      className={`cursor-pointer flex items-center justify-between truncate ${
                        watchedVideos[v.id]
                          ? "text-green-300"
                          : "hover:text-yellow-200"
                      }`}
                    >
                      <span>{v.titulo}</span>
                      {watchedVideos[v.id] && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-green-400 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          videos.map((video) => (
            <li
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`cursor-pointer transition flex items-center justify-between truncate ${
                watchedVideos[video.id]
                  ? "text-green-300"
                  : "hover:text-yellow-200"
              }`}
              title={video.titulo || video.descricao}
            >
              <span>{video.titulo || video.descricao}</span>

              {watchedVideos[video.id] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-green-400 flex-shrink-0 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </li>
          ))
        )}
      </ul>

      {/* Botão de material */}
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
