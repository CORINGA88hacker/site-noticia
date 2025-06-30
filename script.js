const animeForm = document.getElementById('animeForm');
const animeTableBody = document.querySelector('#animeTable tbody');

// Envia Anime para o Firebase
animeForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const genero = document.getElementById('genero').value;
  const status = document.getElementById('status').value;
  const capitulos = document.getElementById('capitulos').value;

  const novoAnime = {
    nome,
    genero,
    status,
    capitulos: parseInt(capitulos)
  };

  // Salva no Firebase com ID automático
  database.ref('animes').push(novoAnime).then(() => {
    animeForm.reset();
    alert("Anime adicionado com sucesso!");
  });
});

// Lista os animes do Firebase
function carregarAnimes() {
  database.ref('animes').on('value', (snapshot) => {
    animeTableBody.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
      const anime = childSnapshot.val();
      const row = `
        <tr>
          <td>${anime.nome}</td>
          <td>${anime.genero}</td>
          <td>${anime.status}</td>
          <td>${anime.capitulos}</td>
        </tr>
      `;
      animeTableBody.innerHTML += row;
    });
  });
}

// Iniciar
carregarAnimes();
