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

const consentKey = "cookieConsent";
const cookieBanner = document.querySelector(".cookie-banner");
const cookieAcceptButton = document.querySelector(".cookie-accept");

if (cookieBanner && cookieAcceptButton) {
  let hasConsent = false;

  try {
    hasConsent = localStorage.getItem(consentKey) === "accepted";
  } catch (error) {
    hasConsent = false;
  }

  if (!hasConsent) {
    cookieBanner.classList.add("is-visible");
  }

  cookieAcceptButton.addEventListener("click", () => {
    try {
      localStorage.setItem(consentKey, "accepted");
    } catch (error) {
      // Ignore storage errors and still hide the banner.
    }
    cookieBanner.classList.remove("is-visible");
  });
}
