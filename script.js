fetch('mangas.json')
  .then(response => response.json())
  .then(mangas => {
    const container = document.getElementById('manga-list');

    mangas.forEach(manga => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h2>${manga.titulo}</h2>
        <p><strong>Autor:</strong> ${manga.autor}</p>
        <p><strong>Ano:</strong> ${manga.ano}</p>
        <p><strong>Gênero:</strong> ${manga.genero}</p>
        <hr>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar mangas:', error);
    document.getElementById('manga-list').innerText = 'Erro ao carregar dados.';
  });
