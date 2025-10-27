import { Link } from 'react-router-dom';
import './NavBar.css';


const NavBar = () => {

  return(
    <nav className='navbar'>
      <div className='logo'>OZ무비</div>
      <div className='search-bar'>
        <input type='text' placeholder='영화 검색...' />
      </div>
      <div className='auth-buttons'>
        <Link to="/login">
          <button>로그인</button>
        </Link>
        <Link to='/signup'>
          <button>회원가입</button>
        </Link>
      </div>
    </nav>
  );
   
}

export default NavBar;