import supabase from '@/lib/supabaseClient';
import { useAuth } from '@/hooks';
import getUserInfo from '@/utils/getUserInfo';

function useAuthActions() {
  const { setUser, setLoading, setError } = useAuth();

  const executeAuthAction = async ({ action }) => {
    setLoading(true);
    setError(null);
    try {
      await action();
      return { success: true };
    } catch (error) {
      console.error(error);
      setError({
        message:
          error.message ??
          '예기치 않은 오류가 발생했습니다.\n잠시 후에 다시 시도해 주세요.',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password, name }) =>
    executeAuthAction({
      action: async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        });

        if (error) throw error;
        setUser(getUserInfo({ user }));
      },
    });

  const logIn = async ({ email, password }) =>
    executeAuthAction({
      action: async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;
        setUser(getUserInfo({ user }));
      },
    });

  const logOut = async () =>
    executeAuthAction({
      action: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
        setUser(null);
      },
    });

  const clearError = () => setError(null);

  return { signUp, logIn, logOut, clearError };
}

export default useAuthActions;
