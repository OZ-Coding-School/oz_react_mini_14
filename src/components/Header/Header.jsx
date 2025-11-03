import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeaderArea,
  StyledLogo,
  StyledTopRow,
  StyledRightSection,
  IconGroup,
  HamburgerBtn,
  SearchBar,
} from "./HeaderStyle";
import debounce from "lodash.debounce";
import Categories from "../Categories";
import { faUser, faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import Icon from "@components/CommonStyle/Icon";

const Header = () => {
  const [hasBackdropFilter, setHasBackdropFilter] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = debounce(() => {
      const shouldBlur = window.scrollY > 50;
      setHasBackdropFilter(shouldBlur);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      navigate(`/search?q=${searchValue}`);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <HeaderArea $hasBackdropFilter={hasBackdropFilter}>
        <StyledTopRow>
          <StyledLogo onClick={handleClick}>
            <img src="/image/keynema_logo.png" alt="keynema_logo" />
          </StyledLogo>
          <Categories />

          <StyledRightSection>
            <SearchBar
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="제목, 사람, 장르"
            />

            <IconGroup>
              <Icon icon={faUser} className="user" label="사용자" />
              <Icon icon={faBell} className="bell" label="알림" />
              <HamburgerBtn
                onClick={toggleMenu}
                className={isMenuOpen ? "open" : ""}
                aria-label="메뉴"
                aria-expanded={isMenuOpen}
              >
                <Icon icon={faBars} label="메뉴" />
              </HamburgerBtn>
            </IconGroup>
          </StyledRightSection>
        </StyledTopRow>
      </HeaderArea>
    </>
  );
};

export default Header;
