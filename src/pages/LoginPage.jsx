import InputField from "../components/common/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useSupabaseAuth } from "../supabase";
import { UserContext } from "../supabase/context/UserContext";
import Button from "@/components/common/Button";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login, loginWithKakao, loginWithGoogle } = useSupabaseAuth();
  const { setUser } = useContext(UserContext);

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

    try {
      setLoading(true);

      const response = await login({
        email: form.email,
        password: form.password,
      });

      if (response.error) {
        setLoading(false);
        setErrors({ form: response.error.message });
        return;
      }
      setUser(response.user);
      navigate("/");
    } catch {
      setLoading(false);
      setErrors({ form: "로그인 중 오류가 발생했습니다." });
    }
  };
  // 카카오 로그인 핸들러
  const handleKakaoLogin = async () => {
    setLoading(true);
    const res = await loginWithKakao();

    if (!res.error) {
      setUser(res.user);
    }
  };
  // Google 로그인 핸들러
  const handleGoogleLogin = async () => {
    setLoading(true);
    const res = await loginWithGoogle();

    if (!res.error) {
      setUser(res.user);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-6">로그인</h2>

      {loading && (
        <p className="text-blue-600 font-medium mb-4">
          로그인 중입니다... 잠시만 기다려주세요.
        </p>
      )}
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
        <Button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          이메일로 로그인
        </Button>
      </form>

      <div className="w-full max-w-md mt-6 flex flex-col gap-3">
        <Button
          onClick={handleKakaoLogin}
          className="w-full bg-yellow-300 text-black py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          카카오로 로그인
        </Button>
        <Button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-800 border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          구글로 로그인
        </Button>
      </div>

      <p className="mt-4 text-sm">
        계정이 없으신가요?{" "}
        <Link to="/signup" className="text-blue-400 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
