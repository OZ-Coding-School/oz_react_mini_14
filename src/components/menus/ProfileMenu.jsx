import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logOut, setHasJustLoggedOut } from '@/utils';
import { Button, LinkButton } from '@/components';
import { TOAST_DURATION } from '@/constants';

function ProfileMenu({ onClose }) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const { success, error } = await logOut();

    if (success) {
      onClose();
      setHasJustLoggedOut(true);
      navigate('/');
    }
    if (error) {
      toast.error(error.message, { autoClose: TOAST_DURATION.error });
    }
  };

  return (
    <div className="absolute right-6 -bottom-18 z-1000 w-30 md:right-13">
      <LinkButton
        to="/my-page"
        variant="stone"
        size="full"
        className="rounded-none"
      >
        마이페이지
      </LinkButton>
      <Button
        variant="stone"
        size="full"
        className="rounded-none"
        onClick={handleLogOut}
      >
        로그아웃
      </Button>
    </div>
  );
}

export default ProfileMenu;
