import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <Navigationbar>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Logo>🎬 • WISH MOVIE</Logo>
      </Link>
      <SearchBox>
        <input type="text" placeholder="tell me your wish 🧞‍♂️" />
      </SearchBox>
      <Buttons>
        <LoginBtn>로그인</LoginBtn>
        <SignupBtn>회원가입</SignupBtn>
      </Buttons>
    </Navigationbar>
  );
}

const Navigationbar = styled.nav`
  width: 100%;
  height: 60px;
  background-color: #1a1a1a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  overflow: hidden;
  gap: 50px;
`;

const Logo = styled.h1`
  font-size: 24px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #757575;
`;

const SearchBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  input {
    width: 100%;
    height: 30px;
    border-radius: 15px;
    border: none;
    padding: 0 15px;
    font-size: 16px;
    background-color: #bafd00;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const LoginBtn = styled.button`
  background: none;
  color: white;
  border: 1px solid white;
  border-radius: 15px;
  padding: 5px 15px;
  cursor: pointer;
`;

const SignupBtn = styled.button`
  background-color: white;
  color: #141414;
  border: none;
  border-radius: 15px;
  padding: 5px 15px;
  cursor: pointer;
`;
