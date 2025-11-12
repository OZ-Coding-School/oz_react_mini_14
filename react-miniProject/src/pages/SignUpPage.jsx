import { useState } from "react";
import { toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";
import "./SignUpPage.scss";
import { useSupabaseAuth } from "@supabase_path";
import { CommonButton, InputField } from "@components";
import { useForm, useInputValidation } from "@hooks";
import { signUpInputFields } from "@constants/signUpInputFields.js";

export default function SignUpPage() {
  const { form, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const supabaseAuth = useSupabaseAuth();
  const [loading, setLoading] = useState(false);
  const { validateSignUp, isValid } = useInputValidation();

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validateSignUp(form);
    setErrors(newErrors);

    if (!isValid(newErrors)) {
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

  const inputFields = signUpInputFields;

  return (
    <div className="sign-container">
      <h2 className="sign-title">회원가입</h2>
      <form className="sign-fomr" onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        ))}
        <CommonButton
          type="submit"
          className="signUpPage-btn"
          onClick={() => navigate("/signup")}
        >
          {loading ? "가입 중...." : "회원가입"}
        </CommonButton>
      </form>
    </div>
  );
}
