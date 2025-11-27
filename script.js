// script.js – VERSION 100% CORRIGÉE ET FONCTIONNELLE (sans sidebar)
let fileIndex = [];

async function loadFiles() {
  const loading = document.getElementById('loading-message');
  loading.innerHTML = 'Chargement Premium...';

  try {
    const proxy = 'https://api.allorigins.win/get?url=';
    const url = encodeURIComponent('https://api.github.com/repos/ivanipote/premium_search/contents/premium_files');
    const res = await fetch(proxy + url);
    const data = await res.json();
    const files = JSON.parse(data.contents);

    fileIndex = files.map(f => ({
      name: f.name,
      path: f.download_url,
      type: f.name.split('.').pop().toLowerCase(),
      size: f.size,
      url: f.html_url
    }));

    displayAllFiles();
    loading.innerHTML = `<span style="color:#28a745;font-weight:bold;">Premium • ${fileIndex.length} fichiers</span>`;

  } catch (err) {
    loading.innerHTML = `<span style="color:#dc3545;">Erreur réseau</span>`;
    setTimeout(loadFiles, 3000);
  }
}

function createCard(file) {
  const icon = file.type === 'pdf' ? 'PDF' :
               ['jpg','png','jpeg','gif','webp'].includes(file.type) ? 'Image' :
               file.type === 'mp3' ? 'Music' :
               file.type === 'apk' ? 'App' :
               file.type === 'zip' ? 'Archive' : 'File';

  const card = document.createElement('div');
  card.className = 'result-item';

  // BACKTICKS ICI → C'EST LA SEULE CHOSE QUI COMPTE
  card.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:15px;padding:15px;">
      <div style="flex:1;">
        <h3 style="margin:0;color:#0066FF;font-size:1.35rem;">
          \( {icon} <strong> \){file.name}</strong>
        </h3>
        <p style="margin:4px 0 0;color:#666;">
          \( {file.type.toUpperCase()} • \){(file.size/1024).toFixed(1)} KB
        </p>
      </div>
      <a href="\( {file.path}" download=" \){file.name}"
         style="background:#0066FF;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:bold;">
        Télécharger
      </a>
    </div>
  `;

  return card;
}

function displayAllFiles() {
  const container = document.getElementById('search-results');
  container.innerHTML = `<div style="text-align:center;margin:30px 0;font-size:1.5rem;color:#0066FF;font-weight:800;">Tous les fichiers Premium</div>`;

  fileIndex.forEach(file => container.appendChild(createCard(file)));
}

function performSearch(query) {
  if (!query.trim()) { displayAllFiles(); return; }

  const matches = fileIndex.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
  
  const container = document.getElementById('search-results');
  container.innerHTML = matches.length === 0
    ? `<div class="loading">Aucun résultat pour "${query}"</div>`
    : `<div style="text-align:center;color:#0066FF;margin:25px 0;font-weight:bold;">${matches.length} résultat(s)</div>`;

  matches.forEach(f => container.appendChild(createCard(f)));
}

// Événements
document.getElementById('search-input').addEventListener('input', e => performSearch(e.target.value));
document.getElementById('search-button').addEventListener('click', () => performSearch(document.getElementById('search-input').value));

document.addEventListener('DOMContentLoaded', loadFiles);
