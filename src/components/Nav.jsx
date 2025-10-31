import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Categories from "./Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      navigate(`/search?q=${searchValue}`);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NavWrap $show={show}>
        <TopRow>
          <Logo onClick={() => navigate("/")}>
            <img src="/image/keynema_logo.png" alt="keynema_logo" />
          </Logo>
          <Categories />

          <RightSection>
            <SearchBar
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="제목, 사람, 장르"
            />

            <IconGroup>
              <FontAwesomeIcon icon={faUser} className="user" />
              <FontAwesomeIcon icon={faBell} className="bell" />
              <MenuBar>
                <span></span>
                <span></span>
                <span></span>
              </MenuBar>
            </IconGroup>
          </RightSection>
        </TopRow>
      </NavWrap>
    </>
  );
};

export default Nav;

const NavWrap = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  transition: all 0.3s ease;
  z-index: 1000;
  background-color: transparent;

  ${(props) =>
    props.$show &&
    `
    background-color: rgba(26, 28, 32, 0.5);
    backdrop-filter: blur(50px);
  `}

  /* 모바일 */
  @media (max-width: 768px) {
    padding: 52px 16px 20px;
    background-color: transparent;
    backdrop-filter: blur(20px);
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 960px) {
    flex-wrap: wrap;
    align-items: center;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;

  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const Logo = styled.a`
  position: fixed;
  top: 20px;
  left: 100px;
  cursor: pointer;

  img {
    width: 128px;
    object-fit: contain;
  }

  @media (max-width: 960px) {
    position: fixed;
    top: 52px;
    left: 16px;

    img {
      width: 118px;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 52px;
    left: 16px;

    img {
      width: 108px;
      height: 20.85px;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 1240px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-end;
  }
`;

const SearchBar = styled.input`
  width: 400px;
  height: 40px;
  background-color: rgba(217, 217, 217, 0.1);
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  border: 1px solid #fff;
  padding: 16px 12px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff1a66;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 1240px) {
    width: 100%;
    height: 100%;
    order: 3;
    margin-bottom: 12px;
  }

  @media (max-width: 960px) {
    width: 100%;
    height: 100%;
    order: 3;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    order: 3;
    margin-bottom: 12px;
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  order: 2;

  .user {
    font-size: 24px;
    cursor: pointer;

    @media (max-width: 900px) {
      display: none;
    }
  }

  .bell {
    font-size: 24px;
    cursor: pointer;
    display: none;

    @media (max-width: 900px) {
      display: block;
    }
  }
`;

const MenuBar = styled.button`
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  span {
    width: 32px;
    height: 2px;
    background-color: white;
    transition: all 0.3s ease;
    display: block;
  }
`;
