export default function Title({ title, backgroundColor, color }) {
  return (
    <div
      className="title-container"
      style={{ backgroundColor: backgroundColor }}
    >
      <h1 className="title" style={{ color: color }}>
        {title}
      </h1>
    </div>
  );
}
