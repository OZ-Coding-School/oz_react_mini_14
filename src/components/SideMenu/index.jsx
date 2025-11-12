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
} from "./style";

const SideMenu = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState("kines-pick");
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const categories = {
    "kines-pick": {
      name: "KINE's Pick",
      items: [
        { label: "오늘의 추천영화", path: "/popular" },
        { label: "오늘의 랭킹", path: "/top_ranked" },
      ],
    },
    community: {
      name: "커뮤니티",
      items: [
        { label: "요즘 뜨는 코멘트", path: "/community/free" },
        { label: "KINEMA 라운지", path: "/community/review" },
      ],
    },
    mykinema: {
      name: "나의KINEMA",
      items: [
        { label: "마이페이지", path: "/mypage" },
        { label: "내가 찜한 영화", path: "/mypage/wishlist" },
        { label: "내가 쓴 리뷰", path: "/mypage/reviews" },
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
