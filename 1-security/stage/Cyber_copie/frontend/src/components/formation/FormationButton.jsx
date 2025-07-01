export default function FormationButton({ title, onClick }) {
  return (
    <button className="formation-button" onClick={onClick}>
      {title}
    </button>
  );
}
