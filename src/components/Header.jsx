import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';

const DEBOUNCE_DELAY = 500;

function Header() {
  const [keyword, setKeyword] = useState('');
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
    <header className="flex bg-stone-800 px-8 py-4 font-bold text-stone-50 shadow-lg">
      <Link
        to="/"
        className="text-3xl xl:text-4xl"
        onClick={() => setKeyword('')}
      >
        OZ무비
      </Link>
      <input
        className="mx-5 grow rounded-md bg-stone-50 px-4 text-stone-950 xl:mx-30"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div>
        <button className="button mr-1 px-3 py-2">로그인</button>
        <button className="button px-3 py-2">회원가입</button>
      </div>
    </header>
  );
}

export default Header;
