import { useState } from "react";
import { supabase } from "../api/supabase";
import { validateEmail } from "../utils/validateEmail";
import { validatePassword } from "../utils/validatePassword";
import "./LoginForm.css";

export default function LoginForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    // 필요시 user 추가 가능: user: null
  });

  // 입력값 변경 event handler(이벤트 핸들러)
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 동작 function(펑션)
  async function handleLogin(e) {
    e.preventDefault();

    // 이메일 validation(밸리데이션)
    if (!validateEmail(state.email)) {
      setState({ ...state, error: "올바른 이메일을 입력하세요." });
      return;
    }

    // 패스워드 validation(밸리데이션)
    if (!validatePassword(state.password)) {
      setState({ ...state, error: "패스워드는 최소 6자 이상이어야 합니다." });
      return;
    }

    // supabase API 호출(login, 로그인)
    const { error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });

    // 결과 처리(result handling, 결과 핸들링)
    if (error) {
      setState({ ...state, error: error.message });
    } else {
      setState({ ...state, error: "" });
      // 필요시: setState({ ...state, error: "", user: data.user });
      // 전역 관리 필요 시 context(컨텍스트)로 확장 가능
    }
  }

  // 렌더링(render, 렌더)
  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
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
