import { useState } from "react";
import { supabase } from "@api/supabase";
import { useNavigate, Link } from "react-router-dom";
import {
  LoginContainer,
  LoginForm,
  Input,
  Button,
  ErrorMessage,
  Divider,
  SocialButtons,
} from "./LoginStyle";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      console.log("로그인 성공:", data);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("로그인 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
      console.error("소셜 로그인 오류:", error);
    }
  };

  return (
    <LoginContainer>
      <h1>로그인</h1>
      <LoginForm onSubmit={handleEmailLogin}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? "..." : "로그인"}
        </Button>
      </LoginForm>

      <Divider>또는</Divider>

      <SocialButtons>
        <Button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="social google"
        >
          Google로 로그인
        </Button>
        <Button
          type="button"
          onClick={() => handleSocialLogin("github")}
          className="social github"
        >
          GitHub로 로그인
        </Button>
      </SocialButtons>

      <p>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </LoginContainer>
  );
}
