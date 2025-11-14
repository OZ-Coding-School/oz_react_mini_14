import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { debounce } from "lodash";
import { useAuth } from "@/hooks";
import {
  Icon,
  Typography,
  SearchInput,
  Categories,
  SideMenu,
} from "@/components";

import {
  HeaderArea,
  TopRow,
  Logo,
  RightSection,
  IconGroup,
  HamburgerBtn,
  UserMenu,
  BellIcon,
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
    } else {
      navigate("/search");
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
                    <Icon
                      name="user"
                      className="user-icon"
                      size="24px"
                      label="사용자"
                    />
                    <div className="dropdown">
                      <Link to="/profile">
                        <Typography variant="bodySmall">내 프로필</Typography>
                      </Link>
                      <button onClick={handleLogout}>
                        <Typography variant="bodySmall">로그아웃</Typography>
                      </button>
                    </div>
                  </UserMenu>
                  <BellIcon>
                    <Icon name="bell" size="24px" label="알림" />
                  </BellIcon>
                </>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Icon
                    name="user"
                    size="24px"
                    label="로그인"
                    className="user-icon"
                  />
                </Link>
              )}

              <HamburgerBtn
                onClick={toggleMenu}
                className={isMenuOpen ? "open" : ""}
                aria-label="메뉴"
                aria-expanded={isMenuOpen}
              >
                <Icon
                  name={isMenuOpen ? "xmark" : "bars"}
                  size="24px"
                  label="메뉴"
                />
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
