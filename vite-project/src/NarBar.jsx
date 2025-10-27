import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleClick}>
        재민
      </div>
      <div>
        <input />
      </div>
      <div className="btn">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}
