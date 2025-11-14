import styled, { keyframes } from "styled-components";

export const Overlay = styled.div`
  display: none;
`;

export const MenuContainer = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: auto;
  max-height: 90vh;
  background-color: rgba(26, 28, 32, 0.2);
  backdrop-filter: blur(25px);
  transform: translateY(${(props) => (props.$isOpen ? "0px" : "-100%")});
  transition: transform 0.3s ease;
  z-index: 2000;
  padding: 250px 98px 40px;
  overflow-x: auto;

  @media (max-width: 768px) {
    left: auto;
    right: 0;
    width: 100%;
    width: 280px;
    height: 100vh;
    max-height: 100vh;
    padding: 80px 24px 40px;
    transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
    background-color: rgba(26, 28, 32, 0.2);
  }

  @media (max-width: 480px) {
    max-width: 280px;
    padding: 80px 20px 32px;
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

  @media (max-width: 768px) {
    position: absolute;
    top: 40px;
    right: 20px;
  }
`;

export const CategoryTabs = styled.div`
  display: flex;
  gap: 120px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    gap: 60px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }
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

  @media (max-width: 1024px) {
    font-size: 28px;
    padding: 10px 0;
    margin-bottom: 16px;
    border-bottom-width: 3px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: 700;
    padding: 8px 0;
    margin-bottom: 16px;
    width: 100%;
    text-align: left;
    color: #ff1a66;
    border-bottom: none;
    cursor: default;
    pointer-events: none;

    &:hover {
      color: #ff1a66;
    }
  }
`;

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

  @media (max-width: 768px) {
    min-width: 100%;
    gap: 0;
    opacity: 1;
    visibility: visible;
    height: auto;
  }
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

  @media (max-width: 1024px) {
    font-size: 18px;
    padding: 14px 10px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 12px 8px;
    font-weight: ${(props) => (props.$active ? "600" : "400")};
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 8px;
  }
`;
