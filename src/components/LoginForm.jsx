// src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅
import { supabase } from "../api/supabase";
import { validate } from "@/utils/validate";
import FormInput from "./FormInput";
import { useAuth } from "../contexts/AuthContext"; // 인증 콘텍스트 훅
import "./LoginForm.css";

export default function LoginForm() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate(); // 페이지 이동용 훅
  const { login } = useAuth(); // 전역 로그인 펑션

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  async function handleLogin(e) {
    e.preventDefault();

    // 이메일 validation
    if (!validate.Email.validate(state.email)) {
      setState({ ...state, error: "올바른 이메일을 입력하세요." });
      return;
    }

    // 패스워드 validation
    if (!validate.Password.validate(state.password)) {
      setState({ ...state, error: "패스워드는 최소 6자 이상이어야 합니다." });
      return;
    }

    // ✅ Supabase 로그인: data.user 안에 user_metadata 포함
    const { data, error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    }); // data.user.user_metadata.name 에 "안지선" 이 들어 있음[web:114][web:83]

    if (error) {
      setState({ ...state, error: error.message });
      return;
    }

    // ✅ Supabase user 객체 전체를 그대로 Context 에 저장
    if (data?.user) {
      login(data.user);
    }

    setState({ ...state, error: "" });

    // 마이페이지로 이동
    navigate("/mypage");
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
