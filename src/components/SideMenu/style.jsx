import styled, { keyframes } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: transparent;
  backdrop-filter: blur(10px);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1999;
`;

export const MenuContainer = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: auto;
  background-color: rgba(26, 28, 32, 0.2);
  backdrop-filter: blur(25px);
  transform: translateY(${(props) => (props.$isOpen ? "0px" : "-100%")});
  transition: transform 0.3s ease;
  z-index: 2000;
  padding: 250px 98px 40px;
  overflow-x: auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 100px;
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

export const CategoryTabs = styled.div`
  display: flex;
  gap: 120px;
  align-items: flex-start;
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CategoryTab = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.$active ? "#ff1a66" : "rgba(255, 255, 255, 0.6)")};
  font-size: 32px;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  padding: 12px 0;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.$active ? "4px solid #ff1a66" : "4px solid transparent"};
  margin-bottom: 20px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #ff1a66;
  }
`;

// 🔥 애니메이션
const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 메뉴 리스트 (탭 아래 붙음)
export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 200px;

  /* active된 탭 아래에만 나타남 */
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  height: ${(props) => (props.$visible ? "auto" : "0")};
  overflow: hidden;

  animation: ${(props) => (props.$visible ? fadeSlideIn : "none")} 0.3s
    ease-in-out;
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const MenuItem = styled.li`
  padding: 16px 12px;
  color: ${(props) => (props.$active ? "#ff1a66" : "white")};
  font-size: 20px;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  text-align: left;

  &:hover {
    color: #ff1a66;
  }
`;
