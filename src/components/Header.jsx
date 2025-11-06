import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import { ThemeContext } from '@/contexts/ThemContext';

const DEBOUNCE_DELAY = 500;

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const debouncedKeyword = useDebounce({
    text: keyword,
    delay: DEBOUNCE_DELAY,
  });

  useEffect(() => {
    const normalizedKeyword = debouncedKeyword.trim().toLowerCase();
    if (normalizedKeyword) navigate(`/search?keyword=${normalizedKeyword}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  return (
    <header className="flex-center relative bg-stone-800 px-8 py-4 font-bold text-stone-50 shadow-lg">
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
      <div className="hidden md:block">
        <button type="button" className="button mr-1 px-3 py-2">
          로그인
        </button>
        <button type="button" className="button px-3 py-2">
          회원가입
        </button>
      </div>
      <button
        type="button"
        aria-label={
          isMobileMenuOpen
            ? '로그인 및 회원가입 메뉴 닫기'
            : '로그인 및 회원가입 메뉴 열기'
        }
        className="button bg-transparent px-2 py-1 text-3xl font-bold md:hidden"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        &equiv;
      </button>
      <button
        type="button"
        aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        className="button font-bol ml-2 size-11 bg-transparent text-3xl md:ml-4"
        onClick={toggleDarkMode}
      >
        {isDarkMode && <p>&#9728;</p>}
        {!isDarkMode && <p className="text-3xl">&#9790;</p>}
      </button>
      {isMobileMenuOpen && (
        <div className="absolute -bottom-30 left-0 z-1000 flex flex-col">
          <button
            type="button"
            className="button mr-1 h-[60px] w-screen rounded-none"
          >
            로그인
          </button>
          <button
            type="button"
            className="button h-[60px] w-screen rounded-none"
          >
            회원가입
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
