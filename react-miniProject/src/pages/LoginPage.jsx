import { useState } from "react";
import InputField from "../Components/common/InputField";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
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
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <form className="login-fomr" onSubmit={handleSubmit}>
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleOnChange}
          error="이메일 에러"
        />
        <InputField
          label="패스워드"
          type="password"
          name="password"
          value={form.password}
          onChange={handleOnChange}
          error="패스워드 에러"
        />
        <div className="btn-container">
          <button type="submit" className="login-btn">
            로그인
          </button>
          <button className="signup-btn" onClick={handleSineUpPage}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
