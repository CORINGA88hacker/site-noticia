
function getParam(nome) {
  const url = new URLSearchParams(window.location.search);
  return url.get(nome);
}

const tipo = getParam("tipo");
const id = getParam("id");

firebase.database().ref(`${tipo}/${id}`).once("value", snap => {
  const data = snap.val();
  document.getElementById("titulo").textContent = data.nome;
  const player = document.getElementById("player");

  if (tipo === "animes") {
    data.episodios.forEach(link => {
      const video = document.createElement("video");
      video.src = link;
      video.controls = true;
      video.width = 640;
      video.className = "video-player";
      player.appendChild(video);
    });
  } else {
    for (let cap in data.capitulos) {
      const h4 = document.createElement("h4");
      h4.textContent = "Capítulo " + cap;
      player.appendChild(h4);

      data.capitulos[cap].forEach(img => {
        const image = document.createElement("img");
        image.src = img;
        image.className = "manga-page";
        player.appendChild(image);
      });
    }
  }
});
