import { useEffect, useContext } from "react";
import { useSupabaseAuth } from "../supabase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/supabase/context/UserContext";

export default function OAuthCallback() {
  const { handleOAuthCallback } = useSupabaseAuth();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const callback = async () => {
      const result = await handleOAuthCallback();
      if (result.user) {
        setUser(result.user);
        navigate("/");
      }
    };
    callback();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      소셜 로그인 처리 중입니다...
    </div>
  );
}
