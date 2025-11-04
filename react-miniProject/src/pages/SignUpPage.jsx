import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/common/InputField";
import "./SignUpPage.scss";

export default function SignUpPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleOnChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleSineUpPage() {
    navigate("/signup");
  }

  return (
    <div className="sign-container">
      <h2 className="sign-title">회원가입</h2>
      <form className="sign-fomr" onSubmit={handleSubmit}>
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleOnChange}
          error="이메일 에러"
        />
        <InputField
          label="이름"
          type="text"
          name="name"
          value={form.name}
          onChange={handleOnChange}
          error="이름 에러"
        />
        <InputField
          label="패스워드"
          type="password"
          name="password"
          value={form.password}
          onChange={handleOnChange}
          error="패스워드 에러"
        />
        <InputField
          label="패스워드 확인"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleOnChange}
          error="패스워드 확인 에러"
        />
        <button className="sign-btn" onClick={handleSineUpPage}>
          회원가입
        </button>
      </form>
    </div>
  );
}
