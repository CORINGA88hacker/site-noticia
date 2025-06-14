async function loadPosts() {
  const container = document.getElementById("posts-container");

  const posts = [
    "noticia-1.md"
  ];

  for (const postUrl of posts) {
    try {
      const res = await fetch(postUrl);
      const text = await res.text();
      const html = markdownToHtml(text);
      const article = document.createElement("article");
      article.innerHTML = html;
      container.appendChild(article);
    } catch (e) {
      console.error("Erro ao carregar post:", postUrl, e);
    }
  }
}

function markdownToHtml(md) {
  return md
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    .replace(/^## (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\n$/gim, '<br />')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
}

window.addEventListener("DOMContentLoaded", loadPosts);
