// src/components/SignUpForm.jsx
import { useState } from "react";
import FormInput from "./FormInput";
import { supabase } from "../api/supabase";
import { validate } from "@/utils/validate";
import "./SignUpForm.css";

// 이름 유효성 검사 (2~8자 한글/영문/숫자)
const nameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
// 비밀번호: 영문 대소문자+숫자 6자 이상
const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

function SignUpForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validateForm() {
    const errs = {};

    if (!nameRegex.test(form.name)) {
      errs.name = "이름은 2~8자 한글/영문/숫자";
    }

    if (!validate.Email.validate(form.email)) {
      errs.email = "이메일 형식이 잘못됨";
    }

    if (!pwRegex.test(form.password)) {
      errs.password = "영문 대/소문자, 숫자 포함 6자 이상";
    }

    if (form.password !== form.confirm) {
      errs.confirm = "비밀번호가 일치하지 않습니다";
    }

    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validateForm();
    setErrors(v);
    if (Object.keys(v).length) return;

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    });

    if (error) {
      setMsg(error.message);
    } else {
      setMsg("회원가입 성공! 메일 인증을 확인하세요.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <FormInput
        label="이름"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="이름(2~8자)"
      />
      <FormInput
        label="이메일"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="이메일"
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="비밀번호"
      />
      <FormInput
        label="비밀번호 확인"
        name="confirm"
        type="password"
        value={form.confirm}
        onChange={handleChange}
        error={errors.confirm}
        placeholder="비밀번호 확인"
      />
      <button type="submit">회원가입</button>
      {msg && <div className="form-msg">{msg}</div>}
    </form>
  );
}

export default SignUpForm;
