"use strict";
function setYear() {
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function setupMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector("#mobileNav");
  if (!navToggle || !mobileNav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });
}

function setupTheme() {
  const themeToggle = document.querySelector("#themeToggle");
  const statusText = document.querySelector("#statusText");

  const savedTheme = localStorage.getItem("hobbyhubTheme");
  if (savedTheme === "cozy") {
    document.body.classList.add("calm");
    if (themeToggle) themeToggle.checked = true;
  }

  if (!themeToggle) return;

  themeToggle.addEventListener("change", (e) => {
    const isCozy = e.target.checked;
    document.body.classList.toggle("calm", isCozy);
    localStorage.setItem("hobbyhubTheme", isCozy ? "cozy" : "default");

    if (statusText) {
      statusText.textContent = isCozy ? "Cozy mode is on." : "Cozy mode is off.";
    }
  });
}

function setupHomePreview() {
  const previewText = document.querySelector("#previewText");
  const previewLink = document.querySelector("#previewLink");
  const previewCards = document.querySelectorAll(".card[data-preview]");

  if (!previewText || !previewCards.length) return;

  if (previewLink) previewLink.hidden = true;

  previewCards.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-preview");
      if (!type) return;

      if (type === "remote") {
        previewText.textContent =
          "Currently we have a book club, an arts and crafts club, and a watch-party club.";
        if (previewLink) {
          previewLink.href = "remote.html";
          previewLink.hidden = false;
        }
      }

      if (type === "local") {
        previewText.textContent =
          "Currently we have a run club that is training for a marathon, a hiking club, and a game-night club.";
        if (previewLink) {
          previewLink.href = "local.html";
          previewLink.hidden = false;
        }
      }
    });
  });
}

function setupAccordion() {
  const accButtons = document.querySelectorAll(".acc-btn");
  if (!accButtons.length) return;

  accButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panelId = btn.getAttribute("aria-controls");
      if (!panelId) return;

      const panel = document.getElementById(panelId);
      const expanded = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
}

function setupEventFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const events = document.querySelectorAll(".event");
  if (!filterButtons.length || !events.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";

      events.forEach((card) => {
        const type = card.getAttribute("data-type");
        const show = filter === "all" || type === filter;
        card.hidden = !show;
      });
    });
  });
}

function setupJoinFormClubs() {
  const remoteClubs = [
    { id: "book", label: "Book Club" },
    { id: "craft", label: "Craft Club" },
    { id: "watch", label: "Watch Party" }
  ];

  const localClubs = [
    { id: "run", label: "Run Club" },
    { id: "nature", label: "Nature Club" },
    { id: "games", label: "Game Night" }
  ];

  function renderClubCheckboxes(clubs, wrapEl) {
    wrapEl.innerHTML = "";

    clubs.forEach((club) => {
      const item = document.createElement("div");
      item.className = "check-item";

      const uid = `club_${club.id}_${wrapEl.id}`;

      item.innerHTML = `
        <input type="checkbox" id="${uid}" name="clubs[]" value="${club.label}">
        <label for="${uid}">${club.label}</label>
      `;

      wrapEl.appendChild(item);
    });
  }

  document.querySelectorAll("select[id^='clubType']").forEach((select) => {
    const suffix = select.id.replace("clubType", ""); // "", "-local", "-remote"
    const wrapEl = document.querySelector(`#clubOptions${suffix}`);
    if (!wrapEl) return;

    select.addEventListener("change", () => {
      if (select.value === "remote") renderClubCheckboxes(remoteClubs, wrapEl);
      if (select.value === "local") renderClubCheckboxes(localClubs, wrapEl);
    });
  });
}


setYear();
setupMobileNav();
setupTheme();
setupHomePreview();
setupAccordion();
setupEventFilters();
setupJoinFormClubs();
