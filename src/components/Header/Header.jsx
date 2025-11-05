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

import {
  faUser,
  faBell,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "@components/CommonStyle/Icon";
import { debounce } from "lodash";
import Categories from "@components/Categories";
import SideMenu from "@components/SideMenu";

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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      navigate(`/search?q=${searchValue}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      return !prev;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <HeaderArea $hasBackdropFilter={hasBackdropFilter}>
        <StyledTopRow>
          <StyledLogo onClick={handleLogoClick}>
            <img src="/image/keynema_logo.png" alt="keynema_logo" />
          </StyledLogo>
          <Categories />

          <StyledRightSection>
            <SearchBar
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
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
                <Icon icon={isMenuOpen ? faXmark : faBars} label="메뉴" />
              </HamburgerBtn>
            </IconGroup>
          </StyledRightSection>
        </StyledTopRow>
      </HeaderArea>

      <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default Header;
