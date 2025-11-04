// src/data/carouselData.js
export async function getCarouselData() {
  try {
    const response = await fetch("http://localhost:5000/api/cursos");
    const data = await response.json();

    // Formata os dados para o carrossel
    const formatted = data.map((curso) => ({
      id: curso.id,
      title: curso.titulo,
      image: `http://localhost:5000${curso.icon_url}`, // URL pública gerada no server
    }));

    return formatted;
  } catch (error) {
    console.error("Erro ao carregar dados do carrossel:", error);
    return []; // retorna vazio se houver erro
  }
}
