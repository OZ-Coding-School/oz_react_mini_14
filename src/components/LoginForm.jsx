// src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "@/utils/validate";
import FormInput from "./FormInput";
import { useAuth } from "../contexts/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ 이제 email/password를 넘겨줄 것

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  async function handleLogin(e) {
    e.preventDefault();

    if (!validate.Email.validate(state.email)) {
      setState({ ...state, error: "올바른 이메일을 입력하세요." });
      return;
    }

    if (!validate.Password.validate(state.password)) {
      setState({ ...state, error: "패스워드는 최소 6자 이상이어야 합니다." });
      return;
    }

    try {
      // ✅ Context의 login에 이메일/패스워드 전달
      await login(state.email, state.password);

      setState({ ...state, error: "" });
      navigate("/mypage");
    } catch (error) {
      setState({
        ...state,
        error: error.message || "로그인에 실패했습니다.",
      });
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title"></h2>
      <form className="login-form" onSubmit={handleLogin}>
        <FormInput
          label="이메일"
          name="email"
          type="text"
          placeholder="이메일"
          value={state.email}
          onChange={handleChange}
          error={null}
        />

        <FormInput
          label="패스워드"
          name="password"
          type="password"
          placeholder="패스워드"
          value={state.password}
          onChange={handleChange}
          error={null}
        />

        <button type="submit" className="login-button">
          로그인
        </button>

        {state.error && <div className="login-error">{state.error}</div>}
      </form>
    </div>
  );
}
