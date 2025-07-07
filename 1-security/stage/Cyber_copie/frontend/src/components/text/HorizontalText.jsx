export default function HorizontalText({ text, title }) {
  return (
    <div
      className="horizontalText-container"
      style={{ textAlign: "center", color: "white" }}
    >
      {title && <div className="horizontalText-title">{title}</div>}
      <p className="horizontalText">{text}</p>
      <span className="horizontalLine"></span>
    </div>
  );
}
