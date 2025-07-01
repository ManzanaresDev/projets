export default function Button({ value, buttonClass, href }) {
  return (
    <button className={`custom-button ${buttonClass}`}>
      <a href={href}>{value}</a>
    </button>
  );
}
