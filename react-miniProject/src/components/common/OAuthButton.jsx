import "./OAuthButton.scss";

export default function OAuthButton({
  onClick,
  logo,
  children,
  className = "",
  label,
}) {
  return (
    <button
      className={`oauth-btn ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      <img src={logo} alt={`${children} logo`} className="oauth-logo" />
      <span className="btn-text">{children}</span>
    </button>
  );
}
