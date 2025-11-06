import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/common/InputField";
import "./SignUpPage.scss";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "../utils/Login-SignupValidation";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleOnChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(
        form.password,
        form.confirmPassword
      ),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");

    if (isValid) {
      alert(`회원가입 성공`);
    }
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
          error={errors.email}
        />
        <InputField
          label="이름"
          type="text"
          name="name"
          value={form.name}
          onChange={handleOnChange}
          error={errors.name}
        />
        <InputField
          label="패스워드"
          type="password"
          name="password"
          value={form.password}
          onChange={handleOnChange}
          error={errors.password}
        />
        <InputField
          label="패스워드 확인"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleOnChange}
          error={errors.confirmPassword}
        />
        <button className="sign-btn" onClick={handleSineUpPage}>
          회원가입
        </button>
      </form>
    </div>
  );
}
