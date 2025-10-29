import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const HandleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavWrap $show={show}>
      <Logo href="/">
        <img src="/image/keynema_logo.png" alt="keynema_logo" />
      </Logo>
      <NavRight>
        <Input
          value={searchValue}
          onChange={HandleChange}
          className="nav__Input"
          type="text"
          placeholder="제목,사람,장르"
        />
        <IconBox>
          <Login></Login>
          <MenuBar>
            <span></span>
            <span></span>
            <span></span>
          </MenuBar>
        </IconBox>
      </NavRight>
    </NavWrap>
  );
};

export default Nav;

const NavWrap = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  margin-top: 20px;
  transition: all 0.3s ease;
  z-index: 1000;

  background-color: transparent;

  //스크롤시
  ${(props) =>
    props.$show &&
    `background-color: rgba(26, 28, 32, 0.3);
   background-filter: blur(10px); 
    `}
`;

const Logo = styled.a`
  display: block;
  width: 128px;

  img {
    object-fit: contain;
    object-position: center;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Input = styled.input`
  width: 300px;
  height: 32px;
  background-color: rgba(217, 217, 217, 0.1);
  border-radius: 4px;
  font-size: 16px;
  line-height: 40px;
  color: #fff;
  border: 1px solid #fff;
  padding: 0 12px;
  &:focus {
    outline: none; /* 기본 파란색 아웃라인 제거 */
    border-color: #fff; /* 클릭해도 흰색 유지 */
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Login = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(217, 217, 217, 0.1);
  border: 1px solid #fff;
`;

const MenuBar = styled.div`
  width: 32px;
  height: 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  span {
    width: 32px;
    height: 2px;
    border-radius: 1px;
    display: block;
    background-color: white;
  } // 클릭 시 메뉴바 나오게
`;
