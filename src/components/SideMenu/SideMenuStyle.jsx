import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-height: 677px;
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
  max-height: 677px;
  width: 100%;
  background-color: rgba(26, 28, 32, 0.2);
  backdrop-filter: blur(25px);
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;
  z-index: 2000;
  padding: 250px 98px 40px;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const CloseButton = styled.button`
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

export const CategoryTabs = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CategoryTab = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.$active ? "#ff1a66" : "rgba(255, 255, 255, 0.6)")};
  font-size: 32px;
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

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MenuItem = styled.li`
  padding: 16px 12px;
  color: ${(props) => (props.$active ? "#ff1a66" : "white")};
  font-size: 20px;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(255, 26, 102, 0.1);
    color: #ff1a66;
  }
`;
