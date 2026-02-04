const header = document.querySelector(".site-header");
const toggleButton = document.querySelector(".menu-toggle");
const mobileLinks = document.querySelectorAll(".mobile-nav a");

if (toggleButton && header) {
  toggleButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
