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

const consentKey = "cookiePreferences";
const cookieBanner = document.querySelector(".cookie-banner");

if (cookieBanner) {
  const saveButton = cookieBanner.querySelector(".cookie-save");
  const rejectButton = cookieBanner.querySelector(".cookie-reject");
  const acceptAllButton = cookieBanner.querySelector(".cookie-accept-all");
  const toggleInputs = cookieBanner.querySelectorAll("input[data-cookie]");
  const optionalCategories = ["functional", "analytics", "marketing"];

  const readPreferences = () => {
    try {
      const stored = localStorage.getItem(consentKey);
      if (!stored) {
        return null;
      }
      const parsed = JSON.parse(stored);
      if (!parsed || typeof parsed !== "object") {
        return null;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  };

  const writePreferences = (preferences) => {
    try {
      localStorage.setItem(consentKey, JSON.stringify(preferences));
    } catch (error) {
      // Ignore storage errors and still hide the banner.
    }
  };

  const setToggleState = (preferences) => {
    toggleInputs.forEach((input) => {
      const key = input.dataset.cookie;
      if (key === "essential") {
        input.checked = true;
        return;
      }
      if (Object.prototype.hasOwnProperty.call(preferences, key)) {
        input.checked = Boolean(preferences[key]);
      }
    });
  };

  const getPreferencesFromToggles = () => {
    const preferences = { essential: true };
    toggleInputs.forEach((input) => {
      const key = input.dataset.cookie;
      if (key && key !== "essential") {
        preferences[key] = input.checked;
      }
    });
    return preferences;
  };

  const storedPreferences = readPreferences();
  if (storedPreferences) {
    setToggleState(storedPreferences);
  } else {
    cookieBanner.classList.add("is-visible");
  }

  if (acceptAllButton) {
    acceptAllButton.addEventListener("click", () => {
      const preferences = { essential: true };
      optionalCategories.forEach((category) => {
        preferences[category] = true;
      });
      setToggleState(preferences);
      writePreferences(preferences);
      cookieBanner.classList.remove("is-visible");
    });
  }

  if (rejectButton) {
    rejectButton.addEventListener("click", () => {
      const preferences = { essential: true };
      optionalCategories.forEach((category) => {
        preferences[category] = false;
      });
      setToggleState(preferences);
      writePreferences(preferences);
      cookieBanner.classList.remove("is-visible");
    });
  }

  if (saveButton) {
    saveButton.addEventListener("click", () => {
      const preferences = getPreferencesFromToggles();
      writePreferences(preferences);
      cookieBanner.classList.remove("is-visible");
    });
  }
}
