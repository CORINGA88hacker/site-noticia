let todosOsMangas = [];

fetch('mangas.json')
  .then(response => response.json())
  .then(mangas => {
    todosOsMangas = mangas;
    mostrarMangas(mangas);
  });

function mostrarMangas(mangas) {
  const container = document.getElementById('manga-list');
  container.innerHTML = '';

  mangas.forEach(manga => {
    const card = document.createElement('div');
    card.className = 'manga-card';
    card.innerHTML = `
      <img src="${manga.capa}" alt="Capa de ${manga.titulo}">
      <h2>${manga.titulo}</h2>
      <p><strong>Autor:</strong> ${manga.autor}</p>
      <p><strong>Ano:</strong> ${manga.ano}</p>
      <p><strong>Gênero:</strong> ${manga.genero}</p>
    `;
    container.appendChild(card);
  });
}

document.getElementById('pesquisa').addEventListener('input', function () {
  const termo = this.value.toLowerCase();
  const filtrados = todosOsMangas.filter(manga =>
    manga.titulo.toLowerCase().includes(termo) ||
    manga.autor.toLowerCase().includes(termo)
  );
  mostrarMangas(filtrados);
});
