import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import { ThemeContext } from '@/contexts';
import { Button, UserMenu } from '@/components';

const DEBOUNCE_DELAY = 500;

function Header() {
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
      <UserMenu />
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
    </header>
  );
}

export default Header;
