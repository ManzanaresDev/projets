import backgroundImage from "../../assets/postit.png";

export function PostIt({ content }) {
  return (
    <div className="postIt-container">
      <div
        className="postIt"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="postIt-content">{content}</div>
      </div>
    </div>
  );
}
