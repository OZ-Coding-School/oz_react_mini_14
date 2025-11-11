import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth, useAuthActions, useDebounce } from '@/hooks';
import { ThemeContext } from '@/contexts';
import { AuthButtons, Button, LinkButton } from '@/components';
import { ERROR_TOAST_DURATION } from '@/constants';

const DEBOUNCE_DELAY = 500;

function Header() {
  const [keyword, setKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, loading, error } = useAuth();
  const { logOut, clearError } = useAuthActions();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const debouncedKeyword = useDebounce({
    text: keyword,
    delay: DEBOUNCE_DELAY,
  });

  const handleLogOut = async () => {
    const { success } = await logOut();
    if (success) {
      toast.success('로그아웃 되었습니다.');
      setIsProfileMenuOpen(false);
      navigate('/');
    }
  };

  useEffect(() => {
    const normalizedKeyword = debouncedKeyword.trim().toLowerCase();
    if (normalizedKeyword) navigate(`/search?keyword=${normalizedKeyword}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { autoClose: ERROR_TOAST_DURATION });
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="flex-center relative bg-stone-800 px-4 py-4 font-bold text-stone-50 shadow-lg md:px-8">
      <Link
        to="/"
        className="text-3xl md:text-4xl"
        onClick={() => setKeyword('')}
      >
        OZ무비
      </Link>
      <input
        className="mx-5 grow rounded-md bg-stone-50 px-4 py-2 text-stone-950 xl:mx-30"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {!user && (
        <div className="hidden md:flex">
          <AuthButtons isMobile={false} />
        </div>
      )}
      {!user && (
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
      )}
      {user && (
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
          <div className="size-full bg-stone-200">
            {!loading && (
              <img
                src={user?.profileImgUrl}
                alt=""
                aria-hidden={true}
                className="size-full object-cover object-center"
              />
            )}
          </div>
        </Button>
      )}
      <Button
        type="button"
        variant="icon"
        size="sm"
        className="md:ml-4"
        aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        onClick={toggleDarkMode}
      >
        {isDarkMode && <p>&#9728;</p>}
        {!isDarkMode && <p className="text-3xl">&#9790;</p>}
      </Button>
      {isMobileMenuOpen && (
        <div className="absolute -bottom-30 left-0 z-1000 flex flex-col">
          <AuthButtons
            isMobile={true}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </div>
      )}
      {isProfileMenuOpen && (
        <div className="absolute right-6 -bottom-18 w-30 md:right-13">
          <LinkButton variant="stone" size="full" className="rounded-none">
            찜 목록
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
    </header>
  );
}

export default Header;
