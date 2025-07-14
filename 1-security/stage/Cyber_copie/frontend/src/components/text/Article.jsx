export function Article({
  title,
  contentFirst,
  contentSec,
  className = "",
  titleClass = "",
  contentClass = "",
}) {
  return (
    <div className={`article-container ${className}`}>
      <div className={`article-title ${titleClass}`}>{title}</div>
      <div className={`article-content ${contentClass}`}>{contentFirst}</div>
      <div className={`article-content ${contentClass}`}>{contentSec}</div>
    </div>
  );
}
