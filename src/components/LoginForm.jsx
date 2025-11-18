import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../api/supabase";
import { validateEmail } from "../utils/validateEmail";
import { validatePassword } from "../utils/validatePassword";
import "./LoginForm.css";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // handleLogin(핸들로그인)에서 유틸 함수로 값 검증
  async function handleLogin(e) {
    e.preventDefault();

    // 이메일 유효성 검사(Validation, 밸리데이션)
    if (!validateEmail(state.email)) {
      setState({ ...state, error: "올바른 이메일을 입력하세요." });
      return;
    }
    // 패스워드 유효성 검사(Validation)
    if (!validatePassword(state.password)) {
      setState({ ...state, error: "패스워드는 최소 6자 이상이어야 합니다." });
      return;
    }
    // 로그인 API 호출(login, 로그인)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });
    if (error) setState({ ...state, error: error.message });
    else {
      setState({ ...state, error: "" });
      setUser(data.user);
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title"></h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email" className="login-label">
          이메일
        </label>
        <input
          id="email"
          name="email"
          className="login-input"
          placeholder="이메일"
          value={state.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="login-label">
          패스워드
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="login-input"
          placeholder="패스워드"
          value={state.password}
          onChange={handleChange}
        />
        <button type="submit" className="login-button">
          로그인
        </button>
        {state.error && <div className="login-error">{state.error}</div>}
      </form>
    </div>
  );
}
