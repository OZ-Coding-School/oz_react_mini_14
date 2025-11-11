import { createContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import { getUserInfo } from '@/utils/auth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return setUser(null);
      setUser(getUserInfo({ user }));
    } catch (error) {
      console.error(error);
      setError({
        message:
          error.message ??
          '예기치 않은 오류가 발생했습니다.\n잠시 후에 다시 시도해 주세요.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session?.user) return setUser(null);
      setUser(getUserInfo({ user: session.user }));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext
      value={{ user, setUser, loading, setLoading, error, setError }}
    >
      {children}
    </AuthContext>
  );
}

export { AuthContext };
export default AuthProvider;
