document.addEventListener('DOMContentLoaded', (event) => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  // Close navbar when link is clicked
  const navLink = document.querySelectorAll(".nav-link");

  navLink.forEach((n) => n.addEventListener("click", closeMenu));

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }

  // Event Listeners: Handling toggle event
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

  toggleSwitch.addEventListener("change", switchTheme, false);

  // Store color theme for future visits
  function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateImage(theme);
  }

  // Save user preference on load
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateImage(currentTheme);
    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    updateImage('light');
  }

  // Adding date
  let myDate = document.querySelector("#datee");
  const yes = new Date().getFullYear();
  myDate.innerHTML = yes;

  // Switch picture darkmode
  function updateImage(theme) {
    const profileImage = document.querySelector('.profile-image');
    if (theme === 'dark') {
      profileImage.src = 'assets/profile-image.png';
    } else {
      profileImage.src = 'assets/profile-image-black.png';
    }

    const logoImage = document.querySelector('.logo-image');
    if (theme === 'dark') {
      logoImage.src = 'assets/logo.png';
    } else {
      logoImage.src = 'assets/logo-black.png';
    }
  }
  async function fetchRSS() {
    const rssUrl = 'https://www.cert.ssi.gouv.fr/feed/';
    const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl);
  
    try {
      const res = await fetch(proxyUrl);
      const data = await res.json();
  
      const feedContainer = document.getElementById("rss-feed");
      feedContainer.innerHTML = "";
  
      for (let i = 0; i < Math.min(6, data.items.length); i++) {
        const item = data.items[i];
        const title = item.title || "Titre inconnu";
        const date = new Date(item.pubDate).toLocaleDateString() || "Date inconnue";
        const link = item.link || "#";
  
        const card = document.createElement("div");
        card.className = "veille-card";
        card.onclick = () => window.open(link, '_blank');
        card.style.cursor = "pointer";
  
        card.innerHTML = `
          <h3>${title}</h3>
          <p>${date}</p>
          <div class="project-link">
            <i class="fas fa-external-link-alt"></i>
          </div>
        `;
  
        feedContainer.appendChild(card);
      }
    } catch (error) {
      console.error("Erreur de chargement du flux RSS :", error);
      document.getElementById("rss-feed").innerHTML = "<p>Impossible de charger les articles pour le moment.</p>";
    }
  }
  
  fetchRSS();
  
});
