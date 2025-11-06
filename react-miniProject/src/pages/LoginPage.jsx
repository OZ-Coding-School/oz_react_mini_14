import { useState } from "react";
import InputField from "../Components/common/InputField";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  validateEmail,
  validatePassword,
} from "../utils/Login-SignupValidation";
import { logInState } from "../store/slice";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleOnChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");
    if (isValid) {
      alert("로그인 성공!");
      dispatch(logInState(true));
      navigate("/");
    }
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
          error={errors.email}
        />
        <InputField
          label="패스워드"
          type="password"
          name="password"
          value={form.password}
          onChange={handleOnChange}
          error={errors.password}
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
