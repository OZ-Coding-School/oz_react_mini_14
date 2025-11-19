import { useState } from "react";
import { supabase } from "../api/supabase";

// Custom Hook (커스텀 훅)
function useLogin(setUser) {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  // 입력 변경 핸들러
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // 실제 로그인 로직 분리 (유틸/훅 내부)
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });
    if (error) setState({ ...state, error: error.message });
    else {
      setState({ ...state, error: "" });
      setUser(data.user);
    }
  };

  return { state, handleChange, handleLogin };
}

export default useLogin;
