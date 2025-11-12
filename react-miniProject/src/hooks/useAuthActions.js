import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logInState } from "@store/slice";
import { useSupabaseAuth } from "@supabase_path";

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const supabaseAuth = useSupabaseAuth();

  const login = () => navigate("/login");
  const signup = () => navigate("/signup");

  const logout = async () => {
    try {
      await supabaseAuth.logout();
      dispatch(logInState(false));
      toast.success("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      toast.error("로그아웃 중 오류가 발생하였습니다.");
      console.error("로그아웃 실패 : ", error);
    }
  };

  return { login, signup, logout };
};
