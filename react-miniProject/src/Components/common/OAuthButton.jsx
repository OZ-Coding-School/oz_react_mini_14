import "./OAuthButton.scss";

export default function OAuthButton({ onClick, logo, text, className = "" }) {
  return (
    <button className={`oauth-btn ${className}`} onClick={onClick}>
      <img src={logo} alt={`${text} logo`} className="oauth-logo" />
      <span className="btn-text">{text}</span>
    </button>
  );
}
