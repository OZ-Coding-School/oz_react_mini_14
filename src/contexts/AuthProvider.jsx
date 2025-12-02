import { createContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserId(user?.id ?? null);
  };

  useEffect(() => {
    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session?.user) return setUserId(null);
      setUserId(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext value={{ userId }}>{children}</AuthContext>;
}

export { AuthContext };
export default AuthProvider;
