import React, { useEffect, useState } from 'react';

const VideoList = ({ idCurso = 1 }) => {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/${idCurso}`)
      .then(response => response.json())
      .then(data => {
        if (data.tipo === 'com_modulos') {
          // Se houver módulos, junta todos os vídeos de todos os módulos
          const todosVideos = data.modulos.flatMap(mod => mod.videos || []);
          setVideos(todosVideos);
        } else if (data.tipo === 'sem_modulos') {
          setVideos(data.videos || []);
        }
      })
      .catch(err => console.error('Erro ao buscar vídeos:', err));
  }, [idCurso]);

  const handlePlay = (video) => {
    setSelected(video);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Lista de Vídeos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id} style={{ marginBottom: '0.5rem' }}>
            <button
              onClick={() => handlePlay(video)}
              style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              {video.titulo || video.descricao || 'Vídeo sem título'}
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Reproduzindo: {selected.titulo}</h3>
          <video
            controls
            width="640"
            src={selected.url}
            style={{ borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoList;
