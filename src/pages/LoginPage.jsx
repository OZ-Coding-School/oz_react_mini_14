import InputField from "../components/common/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSupabaseAuth } from "../supabase";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { login } = useSupabaseAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "이메일 형식이 올바르지 않습니다.";
      } else {
        delete newErrors.email;
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setErrors({ form: "이메일과 비밀번호를 입력해주세요." });
      return;
    }

    console.log("로그인 시도:", form);

    const response = await login({
      email: form.email,
      password: form.password,
    });

    if (response.error) {
      setErrors({ form: response.error.message });
      console.log("로그인 실패:", response.error);
      return;
    }

    console.log("로그인 성공:", response.user);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-6">로그인</h2>
      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          로그인
        </button>
      </form>
      <p className="mt-4 text-sm">
        계정이 없으신가요?{" "}
        <Link to="/signup" className="text-blue-400 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
