import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  HeaderArea,
  StyledLogo,
  StyledTopRow,
  StyledRightSection,
  IconGroup,
  HamburgerBtn,
  SearchBar,
  UserMenu,
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
import { useAuth } from "@/hook/useAuth";

const Header = () => {
  const [hasBackdropFilter, setHasBackdropFilter] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, loading, signOut } = useAuth();

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

  const handleLogout = async () => {
    await signOut();
    navigate("/");
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
              {loading ? (
                <span style={{ color: "white" }}>...</span>
              ) : user ? (
                <>
                  <UserMenu>
                    <Icon icon={faUser} className="user" label="사용자" />
                    <div className="dropdown">
                      <Link to="/profile">내 프로필</Link>
                      <button onClick={handleLogout}>로그아웃</button>
                    </div>
                  </UserMenu>
                  <Icon icon={faBell} className="bell" label="알림" />
                </>
              ) : (
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <Icon icon={faUser} className="user" label="로그인" />
                </Link>
              )}

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
