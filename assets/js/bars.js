/* ============================================================
   bars.js — Animation des barres de compétences au chargement
   Utilise IntersectionObserver pour déclencher au scroll.
   ============================================================ */

(function () {
  "use strict";

  /**
   * Anime toutes les barres .bar-fill dès qu'elles entrent dans le viewport.
   * La largeur cible est lue depuis l'attribut data-width (valeur en %).
   */
  function initBars() {
    const bars = document.querySelectorAll(".bar-fill");

    if (!bars.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute("data-width") || "0";
            bar.style.width = targetWidth + "%";
            observer.unobserve(bar); // déclenché une seule fois
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  // Lancement après chargement complet du DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBars);
  } else {
    initBars();
  }
})();
