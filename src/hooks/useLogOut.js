import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logOut, setHasJustLoggedOut } from '@/utils';
import { TOAST_DURATION } from '@/constants';

function useLogOut({ cleanUpFn }) {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const { success, error } = await logOut();

    if (success) {
      cleanUpFn?.();
      setHasJustLoggedOut(true);
      navigate('/');
    }
    if (error) {
      toast.error(error.message, { autoClose: TOAST_DURATION.error });
    }
  };

  return { handleLogOut };
}

export default useLogOut;
