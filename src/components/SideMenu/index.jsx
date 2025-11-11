import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Overlay,
  MenuContainer,
  CloseButton,
  CategoryTabs,
  CategoryTab,
  MenuList,
  MenuItem,
} from "./SideMenuStyle";

const SideMenu = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState("kines-pick");
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname && isOpen) onClose();
    prevPathnameRef.current = location.pathname;
  }, [location.pathname, isOpen, onClose]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const categories = {
    "kines-pick": {
      name: "Kine's pick",
      items: [
        { label: "홈", path: "/" },
        { label: "인기 영화", path: "/popular" },
        { label: "검색", path: "/search" },
      ],
    },
    community: {
      name: "커뮤니티",
      items: [
        { label: "자유게시판", path: "/community/free" },
        { label: "영화 리뷰", path: "/community/review" },
      ],
    },
    mykinema: {
      name: "나의KINEMA",
      items: [
        { label: "내 정보", path: "/mypage" },
        { label: "찜한 영화", path: "/mypage/wishlist" },
        { label: "내 리뷰", path: "/mypage/reviews" },
      ],
    },
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <MenuContainer ref={menuRef} $isOpen={isOpen}>
        <CloseButton onClick={onClose}>✕</CloseButton>

        <CategoryTabs>
          {Object.keys(categories).map((key) => (
            <CategoryTab
              key={key}
              $active={activeCategory === key}
              onClick={() => setActiveCategory(key)}
            >
              {categories[key].name}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <MenuList>
          {categories[activeCategory].items.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => handleNavigate(item.path)}
              $active={location.pathname === item.path}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuContainer>
    </>
  );
};

export default SideMenu;
