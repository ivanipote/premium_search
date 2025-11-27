// sidebar.js – Gestion complète du menu hamburger + sidebar
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

function openSidebar() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  hamburger.classList.add("active");
}

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.classList.remove("active");
}

// Événements
hamburger.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);
