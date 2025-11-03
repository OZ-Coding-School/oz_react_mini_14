import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    return () => document.addEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

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

// ===== 스타일 =====

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1999;
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 677px;
  width: 100%;
  max-width: 375px;
  background-color: rgba(26, 28, 32, 0.76);
  backdrop-filter: blur(25px);
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;
  z-index: 2000;
  padding: 60px 24px 40px;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #ff1a66;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CategoryTab = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.$active ? "#ff1a66" : "rgba(255, 255, 255, 0.6)")};
  font-size: 16px;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  padding: 12px 0;
  cursor: pointer;
  border-bottom: ${(props) => (props.$active ? "1px solid #ff1a66" : "none")};
  margin-bottom: -1px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff1a66;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.li`
  padding: 16px 12px;
  color: ${(props) => (props.$active ? "#ff1a66" : "white")};
  font-size: 16px;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(255, 26, 102, 0.1);
    color: #ff1a66;
  }
`;
