import { useLogOut } from '@/hooks';
import { Button, LinkButton } from '@/components';

function ProfileMenu({ onClose }) {
  const { handleLogOut } = useLogOut({ cleanUpFn: onClose });

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
