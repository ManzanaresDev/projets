export default function Text({ text, title, vertical = true, color }) {
  return vertical ? (
    <>
      <div className="text-container-vertical">
        <span
          className="verticalLine"
          style={{ backgroundColor: color }}
        ></span>
        <div
          className="text-container"
          style={{ textAlign: "center", width: "100%" }}
        >
          {title && (
            <h1 className="text-title" style={{ color: color }}>
              {title}
            </h1>
          )}
          <p className="text-description" style={{ color: color }}>
            {text}
          </p>
        </div>
      </div>
    </>
  ) : (
    <div
      className="text-container"
      style={{ textAlign: "center", width: "60%" }}
    >
      {title && (
        <h1 className="text-title" style={{ color: color }}>
          {title}
        </h1>
      )}
      <p className="text-description" style={{ color: color }}>
        {text}
      </p>
      <span
        className="horizontalLine"
        style={{ backgroundColor: color }}
      ></span>
    </div>
  );
}
