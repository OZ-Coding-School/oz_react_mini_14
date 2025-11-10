import "./InputField.scss";

export default function InputField({
  label,
  type,
  name,
  value = "",
  onChange,
  error,
}) {
  let placeHolderText = "";
  if (name === "name") {
    placeHolderText = "이름은 2~8자 한글, 영어만 가능합니다.";
  } else if (name === "email") {
    placeHolderText = "email 형식에 맞게 입력해 주십시오.";
  } else if (name === "password") {
    placeHolderText = "영어 대소문자와 숫자를 포함 6자리 이상 입력해주세요";
  } else if (name === "confirmPassword") {
    placeHolderText = "위 비밀번호와 똑같이 입력해 주십시오.";
  }

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
        placeholder={placeHolderText}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
