/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/api";
import {
  PageWrapper,
  SignupContainer,
  SignupForm,
  Input,
  Button,
  ErrorMessage,
  SuccessMessage,
  Divider,
} from "./style";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    //유효성검사
    if (
      !name ||
      name.length < 2 ||
      name.length > 8 ||
      !/^[가-힣a-zA-Z0-9]+$/.test(name)
    ) {
      setError("이름은 2~8자 이내의 한글, 영어, 숫자만 사용할 수 있습니다.");
      setLoading(false);
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      setLoading(false);
      return;
    }

    if (
      !password ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)
    ) {
      setError("비밀번호는 영어 대문자, 소문자, 숫자를 포함해야 합니다.");
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: name || email.split("@")[0],
          },
        },
      });

      if (error) throw error;
      setSuccess("회원가입 성공! 로그인 페이지로 이동합니다.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.error("이메일을 확인 해 주세요.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <SignupContainer>
        <h1>회원가입</h1>

        <SignupForm onSubmit={handleSignup}>
          <Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="비밀번호 (최소 6자)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? "..." : "회원가입"}
          </Button>
        </SignupForm>

        <Divider />

        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </SignupContainer>
    </PageWrapper>
  );
}
