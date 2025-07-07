export function List({ items }) {
  return (
    <ul className="dropdown-list">
      {items.map((item, idx) => (
        <li key={idx}>
          {/* Si item est un objet avec label et path */}
          {"label" in item && "path" in item ? (
            <a href={item.path}>{item.label}</a>
          ) : (
            // Sinon, affiche simplement l'item (pour compatibilité)
            item
          )}
        </li>
      ))}
    </ul>
  );
}
