// frontend/src/outils/insertLinks.js
/**
 * Génère et insère dynamiquement des balises <a> dans une div
 * @param {string} divId - ID de la div cible
 * @param {Array} links - Tableau d'objets { href, text, className }
 */
export function insertLinks(divId, links) {
  const container = document.getElementById(divId);

  if (!container) {
    return;
  }

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.id = link.id;
    a.className = link.class;
    a.textContent = link.text;
    if (link.class) a.className = link.class;
    container.appendChild(a);
  });
}
