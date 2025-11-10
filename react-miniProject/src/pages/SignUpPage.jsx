import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import "./SignUpPage.scss";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "../utils/Login-SignupValidation";
import { useSupabaseAuth } from "../../supabase";
import CommonButton from "../components/common/CommonButton";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const supabaseAuth = useSupabaseAuth();
  const [loading, setLoading] = useState(false);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(
        form.password,
        form.confirmPassword
      ),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");
    if (!isValid) {
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabaseAuth.signUp({
        email: form.email,
        password: form.password,
        display_name: form.name,
        options: { data: {} },
      });
      if (error) throw error;

      toast.success(`회원가입 성공!`);
      navigate("/login");
    } catch (error) {
      toast.error(`회원가입 실패 : ${error.message}`);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSineUpPage() {
    navigate("/signup");
  }

  return (
    <div className="sign-container">
      <h2 className="sign-title">회원가입</h2>
      <form className="sign-fomr" onSubmit={handleSubmit}>
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleOnChange}
          error={errors.email}
        />
        <InputField
          label="이름"
          type="text"
          name="name"
          value={form.name}
          onChange={handleOnChange}
          error={errors.name}
        />
        <InputField
          label="패스워드"
          type="password"
          name="password"
          value={form.password}
          onChange={handleOnChange}
          error={errors.password}
        />
        <InputField
          label="패스워드 확인"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleOnChange}
          error={errors.confirmPassword}
        />
        <CommonButton
          type="submit"
          className="signUpPage-btn"
          onClick={handleSineUpPage}
        >
          {loading ? "가입 중...." : "회원가입"}
        </CommonButton>
      </form>
    </div>
  );
}
