let todosOsMangas = [];
const container = document.getElementById('manga-list');
const contador = document.getElementById('contadorMangas');

fetch('mangas.json')
  .then(res => res.json())
  .then(data => {
    todosOsMangas = data;
    mostrarMangas(data);
    new CountUp('contadorMangas', data.length).start();
  });

function mostrarMangas(mangas) {
  container.innerHTML = '';
  mangas.forEach(m => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="manga-card" data-aos="zoom-in">
        <img src="${m.capa}" alt="Capa de ${m.titulo}">
        <h2>${m.titulo}</h2>
        <p><i class="fa-solid fa-user"></i> ${m.autor}</p>
        <p><i class="fa-solid fa-calendar-day"></i> ${m.ano}</p>
        <p><i class="fa-solid fa-tag"></i> ${m.genero}</p>
        <p><i class="fa-solid fa-book-open"></i> ${m.capitulos} capítulos</p>
        <p><i class="fa-solid fa-signal"></i> ${m.status}</p>
      </div>
    `;
    container.appendChild(col);
  });
}

document.getElementById('pesquisa').addEventListener('input', function () {
  const termo = this.value.toLowerCase();
  const filtrados = todosOsMangas.filter(m =>
    m.titulo.toLowerCase().includes(termo) ||
    m.autor.toLowerCase().includes(termo) ||
    m.status.toLowerCase().includes(termo)
  );
  mostrarMangas(filtrados);
});
