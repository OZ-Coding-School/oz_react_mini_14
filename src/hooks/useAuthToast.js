import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/hooks';
import {
  getHasJustLoggedIn,
  getHasJustLoggedOut,
  setHasJustLoggedIn,
  setHasJustLoggedOut,
} from '@/utils/auth';

function useAuthToast() {
  const { data: user } = useCurrentUser();

  useEffect(() => {
    const hasJustLoggedIn = getHasJustLoggedIn();
    const hasJustLoggedOut = getHasJustLoggedOut();

    if (hasJustLoggedIn && user) {
      toast.success(`${user.name}님, 환영합니다!`);
      setHasJustLoggedIn(false);
    }
    if (hasJustLoggedOut && !user) {
      toast.success('로그아웃 되었습니다.');
      setHasJustLoggedOut(false);
    }
  }, [user]);
}

export default useAuthToast;
