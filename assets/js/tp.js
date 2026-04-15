/* ============================================================
   tp.js — Interactivité de la page Travaux Pratiques
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────
     1. Génération automatique des sommaires
        (lit les sections présentes dans le DOM)
     ────────────────────────────────────────────── */
  const sections   = document.querySelectorAll('.tp-section');
  const tocList    = document.getElementById('toc-list');
  const tocRightList = document.getElementById('toc-right-list');

  sections.forEach((section, i) => {
    const title = section.dataset.title || section.querySelector('h2')?.textContent.trim() || `Section ${i + 1}`;
    const id    = section.id || `section-${i + 1}`;
    section.id  = id;

    // Sommaire intégré en haut de page
    if (tocList) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${id}"><span class="toc-num">${String(i + 1).padStart(2, '0')}</span>${title}</a>`;
      tocList.appendChild(li);
    }

    // Sommaire flottant droit
    if (tocRightList) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${id}" data-section="${id}">${title}</a>`;
      tocRightList.appendChild(li);
    }
  });


  /* ──────────────────────────────────────────────
     2. Surlignage de la section active (scroll spy)
        sur le sommaire droit
     ────────────────────────────────────────────── */
  const tocRightLinks = tocRightList ? tocRightList.querySelectorAll('a') : [];

  function updateActiveTocLink() {
    let currentId = '';
    const offset  = 56 + 32; // hauteur navbar + marge

    sections.forEach(section => {
      if (window.scrollY + offset >= section.offsetTop) {
        currentId = section.id;
      }
    });

    tocRightLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  window.addEventListener('scroll', updateActiveTocLink, { passive: true });
  updateActiveTocLink();


  /* ──────────────────────────────────────────────
     3. Boutons "Copier" sur les blocs de code
     ────────────────────────────────────────────── */
  document.querySelectorAll('.tp-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const codeEl   = document.getElementById(targetId);
      if (!codeEl) return;

      const text = codeEl.textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copié !';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copier';
          btn.classList.remove('copied');
        }, 1800);
      }).catch(() => {
        /* Fallback pour navigateurs sans clipboard API */
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity  = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Copié !';
        setTimeout(() => { btn.textContent = 'Copier'; }, 1800);
      });
    });
  });


  /* ──────────────────────────────────────────────
     4. Navigation sidebar — changement de TP actif
        (optionnel : à brancher sur ton système PHP)
     ────────────────────────────────────────────── */
  document.querySelectorAll('.tp-sidebar-link').forEach(link => {
    link.addEventListener('click', e => {
      // Si le lien pointe vers une vraie URL, laisse le navigateur gérer
      if (link.href && link.href !== '#' && !link.href.endsWith('#')) return;

      e.preventDefault();
      document.querySelectorAll('.tp-sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Met à jour le fil d'ariane (démo)
      const tpId   = link.dataset.tp || '';
      const text   = link.textContent.trim();
      const bcTitle = document.getElementById('bc-title');
      if (bcTitle) bcTitle.textContent = text;
    });
  });


  /* ──────────────────────────────────────────────
     5. Smooth scroll sur les liens du sommaire
     ────────────────────────────────────────────── */
  document.querySelectorAll('.tp-toc-list a, .tp-toc-right-list a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const offset = 56 + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

});
