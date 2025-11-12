import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { debounce } from "lodash";
import {
  faUser,
  faBell,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "@components/common/Icon";
import Typography from "@components/common/Typhography";
import SearchInput from "@components/common/SearchInput";
import Categories from "@/components/Categories";
import SideMenu from "@components/SideMenu";
import { useAuth } from "@/hooks/useAuth";

import {
  HeaderArea,
  TopRow,
  Logo,
  RightSection,
  IconGroup,
  HamburgerBtn,
  UserMenu,
} from "./style";

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
    setIsMenuOpen((prev) => !prev);
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
        <TopRow>
          <Logo onClick={handleLogoClick}>
            <img src="/src/assets/image/keynema_logo.png" alt="keynema_logo" />
          </Logo>
          <Categories />

          <RightSection>
            <SearchInput
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              placeholder="제목, 사람, 장르"
            />

            <IconGroup>
              {loading ? (
                <Typography variant="bodySmall">...</Typography>
              ) : user ? (
                <>
                  <UserMenu>
                    <Icon icon={faUser} className="user" label="사용자" />
                    <div className="dropdown">
                      <Link to="/profile">
                        <Typography variant="bodySmall">내 프로필</Typography>
                      </Link>
                      <button onClick={handleLogout}>
                        <Typography variant="bodySmall">로그아웃</Typography>
                      </button>
                    </div>
                  </UserMenu>
                  <Icon icon={faBell} className="bell" label="알림" />
                </>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
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
          </RightSection>
        </TopRow>
      </HeaderArea>

      <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default Header;
