import { useState } from "react";
import { useSupabaseAuth } from "@sb";

export default function Register() {
  const { signUp } = useSupabaseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await signUp({
      email,
      password,
      userName,
    });

    if (response.error) {
      alert(`회원가입 실패: ${response.error.message}`);
      return;
    }

    const user = response.user;

    alert(`회원가입 성공! 환영합니다, ${user.userName}님`);
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input placeholder="이름" onChange={(e) => setUserName(e.target.value)} />

      <button type="submit">회원가입</button>
    </form>
  );
}
