import "./InputField.scss";

export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) {
  return (
    <div className="input-field">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        className="input-box"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={type + " 을 입력해주세요."}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
