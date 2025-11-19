import { useState } from "react";
import InputField from "../components/common/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { signUp } = useSupabaseAuth();

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z가-힣0-9]{2,8}$/.test(form.name)) {
      newErrors.name = "이름은 2~8자 한글, 영어, 숫자만 가능합니다.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    }

    if (!/^(?=.*[a-z])(?=.*\d).{6,}$/.test(form.password)) {
      newErrors.password = "비밀번호는 영어+숫자 조합이어야 합니다.";
    }

    if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    try {
      const response = await signUp({
        email: form.email,
        password: form.password,
        userName: form.name,
      });

      if (response.error) {
        setErrors({ form: response.error.message });
        return;
      }
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrors({ form: "회원가입 중 오류가 발생했습니다." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-6">회원가입</h2>
      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <InputField
          label="이름"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
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
        <InputField
          label="비밀번호 확인"
          type="password"
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
        />

        {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

        <button
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          type="submit"
        >
          회원가입
        </button>
      </form>
      <p className="mt-4 text-sm">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
