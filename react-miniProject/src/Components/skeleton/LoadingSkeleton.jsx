import "./LoadingSkeleton.scss";

export default function LoadingSkeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton-poster"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
    </div>
  );
}
