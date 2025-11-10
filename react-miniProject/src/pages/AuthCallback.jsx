import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../supabase";
import { useEffect } from "react";
import { logInState } from "../store/slice";

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supabase = useSupabase();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // 1) 세션 확인
      const { data, error } = await supabase.auth.getSession();
      console.log(data);
      if (error) {
        console.error("세션 불러오기 오류:", error);
        navigate("/login");
        return;
      }

      // 2) 세션이 있으면 로그인 완료된 것
      if (data.session) {
        dispatch(logInState(true)); // Redux 로그인 상태 변경
        navigate("/");
      } else {
        // 세션 없음 → 로그인 실패
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [navigate, dispatch, supabase]);

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "#00bcd4" }}>
      <h2>로그인 처리 중...</h2>
    </div>
  );
}
