let todosOsMangas = [];
const inputBusca = document.getElementById('pesquisa');
const container = document.getElementById('manga-list');

fetch('mangas.json')
  .then(res => res.json())
  .then(data => {
    todosOsMangas = data;
    mostrarMangas(data);
  })
  .catch(err => {
    container.innerHTML = `<p style="text-align:center">Erro ao carregar os mangás 😞</p>`;
    console.error(err);
  });

function mostrarMangas(mangas) {
  container.innerHTML = '';  
  if (mangas.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#bbb;">Nenhum mangá encontrado :(</p>`;
    return;
  }

  mangas.forEach(m => {
    const card = document.createElement('div');
    card.className = 'manga-card animate__animated animate__fadeInUp';
    card.innerHTML = `
      <img src="${m.capa}" alt="Capa de ${m.titulo}">
      <h2>${m.titulo}</h2>
      <p><i class="fa-solid fa-user"></i> ${m.autor}</p>
      <p><i class="fa-solid fa-calendar-day"></i> ${m.ano}</p>
      <p><i class="fa-solid fa-tag"></i> ${m.genero}</p>
    `;
    container.appendChild(card);
  });
}

inputBusca.addEventListener('input', () => {
  const termo = inputBusca.value.toLowerCase().trim();
  const filtrados = todosOsMangas.filter(m => 
    m.titulo.toLowerCase().includes(termo) ||
    m.autor.toLowerCase().includes(termo)
  );
  mostrarMangas(filtrados);
});
