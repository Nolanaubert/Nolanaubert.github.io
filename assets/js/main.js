/* ============================================================
   main.js — Interactions générales de la page CV
   ============================================================ */

(function () {
  "use strict";

  /* ── Mise à jour dynamique de l'année dans le footer ── */
  function setCurrentYear() {
    const yearSpan = document.querySelector(".footer-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  /* ── Effet de survol sonore sur les skill-tags (visuel uniquement) ── */
  function initSkillTags() {
    const tags = document.querySelectorAll(".skill-tag");
    tags.forEach(function (tag) {
      tag.setAttribute("tabindex", "0"); // accessibilité clavier
    });
  }

  /* ── Lancement ── */
  function init() {
    setCurrentYear();
    initSkillTags();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
