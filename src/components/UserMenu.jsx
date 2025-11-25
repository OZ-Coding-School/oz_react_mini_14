import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/hooks';
import { logOut, setHasJustLoggedOut } from '@/utils';
import { AuthButtons, Button, LinkButton } from '@/components';
import { TOAST_DURATION } from '@/constants';

function UserMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const { success, error } = await logOut();

    if (success) {
      setIsProfileMenuOpen(false);
      setHasJustLoggedOut(true);
      navigate('/');
    }
    if (error) {
      toast.error(error.message, { autoClose: TOAST_DURATION.error });
    }
  };

  useEffect(() => {
    if (user) setIsMobileMenuOpen(false);
  }, [user]);

  if (isUserLoading)
    return (
      <div className="size-9 animate-pulse overflow-hidden rounded-full bg-stone-500 md:size-10"></div>
    );
  return (
    <>
      {user ? (
        <Button
          type="button"
          variant="profile"
          aria-label={
            isProfileMenuOpen
              ? '찜 목록 및 로그아웃 메뉴 닫기'
              : '찜 목록 및 로그아웃 메뉴 열기'
          }
          onClick={() => setIsProfileMenuOpen((prev) => !prev)}
        >
          <img
            src={user.profileImgUrl}
            alt="유저의 프로필 이미지"
            aria-hidden={true}
            className="size-full object-cover object-center"
          />
        </Button>
      ) : (
        <>
          <Button
            type="button"
            variant="icon"
            size="sm"
            className="md:hidden"
            aria-label={
              isMobileMenuOpen
                ? '로그인 및 회원가입 메뉴 닫기'
                : '로그인 및 회원가입 메뉴 열기'
            }
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            &equiv;
          </Button>
          <div className="hidden md:flex">
            <AuthButtons isMobile={false} />
          </div>
        </>
      )}
      {isMobileMenuOpen && (
        <div className="absolute -bottom-30 left-0 z-1000 flex flex-col">
          <AuthButtons
            isMobile={true}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </div>
      )}
      {isProfileMenuOpen && (
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
      )}
    </>
  );
}

export default UserMenu;
