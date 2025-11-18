// src/components/LoginForm.jsx
import { useState } from "react";
import { supabase } from "../api/supabase";
import { validateEmail } from "../utils/validateEmail";
import { validatePassword } from "../utils/validatePassword";
import FormInput from "./FormInput";
import "./LoginForm.css";

export default function LoginForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
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

    if (error) {
      setState({ ...state, error: error.message });
    } else {
      setState({ ...state, error: "" });
    }
  }

  // 렌더링(render, 렌더)
  return (
    <div className="login-container">
      <h2 className="login-title"></h2>
      <form className="login-form" onSubmit={handleLogin}>
        {/* 이메일 입력 FormInput(폼인풋) 사용 */}
        <FormInput
          label="이메일"
          name="email" // state.email 과 연결
          type="text"
          placeholder="이메일"
          value={state.email}
          onChange={handleChange}
          error={null} // 필요시 에러 메시지 넣을 자리
        />

        {/* 패스워드 입력 FormInput(폼인풋) 사용 */}
        <FormInput
          label="패스워드"
          name="password" // state.password 와 연결
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
