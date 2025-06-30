const conteudo = document.getElementById('conteudo');

function criarCard(tipo, id, item) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${item.capa}" alt="capa">
    <h3>${item.nome}</h3>
    <p>${item.genero}</p>
    <p>${item.status}</p>
    <a href="player.html?tipo=${tipo}&id=${id}" class="btn">Ver ${tipo === 'animes' ? 'Anime' : 'Mangá'}</a>
  `;
  conteudo.appendChild(div);
}

function carregar(tipo) {
  firebase.database().ref(tipo).once("value", snapshot => {
    snapshot.forEach(child => {
      criarCard(tipo, child.key, child.val());
    });
  });
}

carregar('animes');
carregar('mangas');
