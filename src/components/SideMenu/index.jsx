import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDE_MENU_CATEGORIES, DEFAULT_CATEGORY } from "@/constants/menu";
import {
  MenuContainer,
  CloseButton,
  CategoryTabs,
  CategorySection,
  CategoryTab,
  MenuList,
  MenuItem,
} from "./style";

const SideMenu = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
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

  return (
    <>
      <MenuContainer ref={menuRef} $isOpen={isOpen}>
        <CloseButton onClick={onClose}>✕</CloseButton>

        <CategoryTabs>
          {Object.keys(SIDE_MENU_CATEGORIES).map((key) => (
            <CategorySection key={key}>
              {/* 탭 버튼 */}
              <CategoryTab
                $active={activeCategory === key}
                onClick={() => setActiveCategory(key)}
              >
                {SIDE_MENU_CATEGORIES[key].name}
              </CategoryTab>

              {/* 하위 메뉴 (active된 탭만 보임) */}
              <MenuList
                $visible={activeCategory === key}
                key={activeCategory === key ? key : undefined}
              >
                {SIDE_MENU_CATEGORIES[key].items.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleNavigate(item.path)}
                    $active={location.pathname === item.path}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </CategorySection>
          ))}
        </CategoryTabs>
      </MenuContainer>
    </>
  );
};

export default SideMenu;
