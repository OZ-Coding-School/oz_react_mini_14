import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInState } from "../store/slice";
import { useSupabaseAuth } from "../../supabase";
import { toast } from "react-toastify";
import { useForm, useInputValidation } from "./index.js";

export function useLoginController() {
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const { form, handleChange } = useForm({ email: "", password: "" });
  const { validateLoginForm, isValid } = useInputValidation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supabaseAuth = useSupabaseAuth();

  async function handleLogin() {
    const newErrors = validateLoginForm(form);
    setErrors(newErrors);

    if (!isValid(newErrors)) return false;

    try {
      setLoading(true);
      setAuthError("");

      const { error } = await supabaseAuth.login({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      toast.success("로그인 성공!");
      dispatch(logInState(true));
      navigate("/");
      return true;
    } catch (error) {
      if (error.message.includes("Invalid login credentials")) {
        setAuthError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (error.message.includes("User not found")) {
        setAuthError("이메일이 존재하지 않습니다.");
      } else if (error.message.includes("missing email or phone")) {
        setAuthError("이메일을 입력해 주십시오.");
      } else {
        setAuthError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    errors,
    authError,
    loading,
    handleChange,
    handleLogin,
  };
}
