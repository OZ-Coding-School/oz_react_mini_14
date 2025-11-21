import { useSupabase } from "../context";

export const useOAuth = () => {
  const supabase = useSupabase();

  const redirectTo = `${window.location.origin}/oauth-callback`;

  // 카카오 로그인
  const loginWithKakao = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // 구글 로그인
  const loginWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { loginWithKakao, loginWithGoogle };
};
