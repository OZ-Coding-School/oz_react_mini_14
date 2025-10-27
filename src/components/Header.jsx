import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex bg-stone-800 px-8 py-4 font-bold text-stone-50 shadow-lg">
      <Link to="/" className="text-3xl xl:text-4xl">
        OZ무비
      </Link>
      <input className="mx-5 grow rounded-md bg-stone-50 px-4 text-stone-950 xl:mx-30" />
      <div>
        <button className="button mr-1 px-3 py-2">로그인</button>
        <button className="button px-3 py-2">회원가입</button>
      </div>
    </header>
  );
}

export default Header;
