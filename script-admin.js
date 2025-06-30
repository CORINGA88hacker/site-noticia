// Inicialização Firebase - já está no firebase-config.js

// Referências
const db = firebase.database();
const auth = firebase.auth();

// Controle de abas
const tabs = document.querySelectorAll('nav button.tab-btn');
const sections = document.querySelectorAll('main section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
});

// Redirecionar se não logado
auth.onAuthStateChanged(user => {
  if (!user) window.location.href = 'login.html';
  else carregarDados();
});

// --- Funções gerais para carregar dados ---

// FILMES
const formFilmes = document.getElementById('formFilmes');
const tabelaFilmes = document.querySelector('#tabelaFilmes tbody');
let editandoFilmeId = null;

function carregarFilmes() {
  tabelaFilmes.innerHTML = '';
  db.ref('filmes').on('value', snapshot => {
    tabelaFilmes.innerHTML = '';
    snapshot.forEach(child => {
      const filme = child.val();
      const id = child.key;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${filme.titulo}</td><td>${filme.genero}</td><td>${filme.ano}</td>
        <td>
          <button onclick="editarFilme('${id}')">Editar</button>
          <button onclick="excluirFilme('${id}')">Excluir</button>
        </td>`;
      tabelaFilmes.appendChild(tr);
    });
  });
}

formFilmes.addEventListener('submit', e => {
  e.preventDefault();
  const novoFilme = {
    titulo: document.getElementById('filmeTitulo').value,
    genero: document.getElementById('filmeGenero').value,
    ano: document.getElementById('filmeAno').value,
    capa: document.getElementById('filmeCapa').value,
    descricao: document.getElementById('filmeDescricao').value
  };
  if (editandoFilmeId) {
    db.ref('filmes/' + editandoFilmeId).set(novoFilme);
    editandoFilmeId = null;
  } else {
    db.ref('filmes').push(novoFilme);
  }
  formFilmes.reset();
});

window.editarFilme = function(id) {
  db.ref('filmes/' + id).once('value').then(snapshot => {
    const f = snapshot.val();
    document.getElementById('filmeTitulo').value = f.titulo;
    document.getElementById('filmeGenero').value = f.genero;
    document.getElementById('filmeAno').value = f.ano;
    document.getElementById('filmeCapa').value = f.capa;
    document.getElementById('filmeDescricao').value = f.descricao;
    editandoFilmeId = id;
  });
}

window.excluirFilme = function(id) {
  if(confirm('Confirma a exclusão do filme?')) {
    db.ref('filmes/' + id).remove();
  }
}

// SÉRIES
const formSeries = document.getElementById('formSeries');
const tabelaSeries = document.querySelector('#tabelaSeries tbody');
let editandoSerieId = null;

function carregarSeries() {
  tabelaSeries.innerHTML = '';
  db.ref('series').on('value', snapshot => {
    tabelaSeries.innerHTML = '';
    snapshot.forEach(child => {
      const serie = child.val();
      const id = child.key;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${serie.titulo}</td><td>${serie.genero}</td><td>${serie.ano}</td>
        <td>
          <button onclick="editarSerie('${id}')">Editar</button>
          <button onclick="excluirSerie('${id}')">Excluir</button>
        </td>`;
      tabelaSeries.appendChild(tr);
    });
  });
}

formSeries.addEventListener('submit', e => {
  e.preventDefault();
  const novaSerie = {
    titulo: document.getElementById('serieTitulo').value,
    genero: document.getElementById('serieGenero').value,
    ano: document.getElementById('serieAno').value,
    capa: document.getElementById('serieCapa').value,
    descricao: document.getElementById('serieDescricao').value
  };
  if (editandoSerieId) {
    db.ref('series/' + editandoSerieId).set(novaSerie);
    editandoSerieId = null;
  } else {
    db.ref('series').push(novaSerie);
  }
  formSeries.reset();
});

window.editarSerie = function(id) {
  db.ref('series/' + id).once('value').then(snapshot => {
    const s = snapshot.val();
    document.getElementById('serieTitulo').value = s.titulo;
    document.getElementById('serieGenero').value = s.genero;
    document.getElementById('serieAno').value = s.ano;
    document.getElementById('serieCapa').value = s.capa;
    document.getElementById('serieDescricao').value = s.descricao;
    editandoSerieId = id;
  });
}

window.excluirSerie = function(id) {
  if(confirm('Confirma a exclusão da série?')) {
    db.ref('series/' + id).remove();
  }
}

// USUÁRIOS
const tabelaUsuarios = document.querySelector('#tabelaUsuarios tbody');

function carregarUsuarios() {
  tabelaUsuarios.innerHTML = '';
  db.ref('users').on('value', snapshot => {
    tabelaUsuarios.innerHTML = '';
    snapshot.forEach(child => {
      const user = child.val();
      const id = child.key;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${user.email || 'Sem email'}</td><td>${id}</td><td>${user.vip ? 'Sim' : 'Não'}</td>
        <td>
          <button onclick="toggleVIP('${id}', ${user.vip ? 'false' : 'true'})">${user.vip ? 'Remover VIP' : 'Tornar VIP'}</button>
          <button onclick="excluirUsuario('${id}')">Excluir</button>
        </td>`;
      tabelaUsuarios.appendChild(tr);
    });
  });
}

window.toggleVIP = function(id, makeVip) {
  db.ref('users/' + id).update({ vip: makeVip });
}

window.excluirUsuario = function(id) {
  if(confirm('Confirma a exclusão do usuário?')) {
    db.ref('users/' + id).remove();
  }
}

// NOTÍCIAS
const formNoticias = document.getElementById('formNoticias');
const tabelaNoticias = document.querySelector('#tabelaNoticias tbody');

function carregarNoticias() {
  tabelaNoticias.innerHTML = '';
  db.ref('noticias').on('value', snapshot => {
    tabelaNoticias.innerHTML = '';
    snapshot.forEach(child => {
      const noticia = child.val();
      const id = child.key;
      const shortText = noticia.conteudo.length > 50 ? noticia.conteudo.substring(0, 47) + '...' : noticia.conteudo;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${noticia.titulo}</td><td>${shortText}</td>
        <td>
          <button onclick="excluirNoticia('${id}')">Excluir</button>
        </td>`;
      tabelaNoticias.appendChild(tr);
    });
  });
}

formNoticias.addEventListener('submit', e => {
  e.preventDefault();
  const novaNoticia = {
    titulo: document.getElementById('noticiaTitulo').value,
    conteudo: document.getElementById('noticiaConteudo').value
  };
  db.ref('noticias').push(novaNoticia);
  formNoticias.reset();
});

window.excluirNoticia = function(id) {
  if(confirm('Confirma a exclusão da notícia?')) {
    db.ref('noticias/' + id).remove();
  }
}

// CHAT
const chatMensagens = document.getElementById('chatMensagens');
const chatInput = document.getElementById('chatInput');
const enviarChat = document.getElementById('enviarChat');

function carregarChat() {
  db.ref('chat').limitToLast(50).on('value', snapshot => {
    chatMensagens.innerHTML = '';
    snapshot.forEach(child => {
      const msg = child.val();
      const div = document.createElement('div');
      div.textContent = `${msg.usuario}: ${msg.mensagem}`;
      chatMensagens.appendChild(div);
    });
    chatMensagens.scrollTop = chatMensagens.scrollHeight;
  });
}

enviarChat.addEventListener('click', () => {
  const user = auth.currentUser;
  if (!user) return alert('Você precisa estar logado!');
  const mensagem = chatInput.value.trim();
  if (mensagem === '') return;
  db.ref('chat').push({
    usuario: user.email || 'Anônimo',
    mensagem,
    timestamp: Date.now()
  });
  chatInput.value = '';
});

// FIGURINHAS
const formFigurinhas = document.getElementById('formFigurinhas');
const tabelaFigurinhas = document.querySelector('#tabelaFigurinhas tbody');

function carregarFigurinhas() {
  tabelaFigurinhas.innerHTML = '';
  db.ref('figurinhas').on('value', snapshot => {
    tabelaFigurinhas.innerHTML = '';
    snapshot.forEach(child => {
      const figurinha = child.val();
      const id = child.key;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${figurinha.nome}</td><td><a href="${figurinha.url}" target="_blank">Link</a></td>
        <td><button onclick="excluirFigurinha('${id}')">Excluir</button></td>`;
      tabelaFigurinhas.appendChild(tr);
    });
  });
}

formFigurinhas.addEventListener('submit', e => {
  e.preventDefault();
  const novaFigurinha = {
    nome: document.getElementById('figurinhaNome').value,
    url: document.getElementById('figurinhaUrl').value
  };
  db.ref('figurinhas').push(novaFigurinha);
  formFigurinhas.reset();
});

window.excluirFigurinha = function(id) {
  if(confirm('Confirma a exclusão da figurinha?')) {
    db.ref('figurinhas/' + id).remove();
  }
}

// Carrega tudo
function carregarDados() {
  carregarFilmes();
  carregarSeries();
  carregarUsuarios();
  carregarNoticias();
  carregarChat();
  carregarFigurinhas();
}
