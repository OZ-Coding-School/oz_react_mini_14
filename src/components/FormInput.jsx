// src/components/FormInput.jsx
function FormInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  name,
  placeholder,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name} // handleChange(핸들체인지)가 사용하는 name
        className="form-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

export default FormInput;
