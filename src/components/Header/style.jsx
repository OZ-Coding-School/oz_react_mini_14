// components/Header/style.js
import styled from "@emotion/styled";

export const HeaderArea = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  transition: all 0.3s ease;
  z-index: 1000;
  background-color: transparent;

  ${(props) =>
    props.$hasBackdropFilter &&
    `
    background-color: rgba(26, 28, 32, 0.5);
    backdrop-filter: blur(50px);
  `}

  @media (max-width: 768px) {
    padding: 0 16px 20px;
    backdrop-filter: blur(20px);
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 40px;

  @media (max-width: 960px) {
    flex-wrap: wrap;
  }
`;

export const Logo = styled.a`
  position: fixed;
  top: 20px;
  left: 100px;
  cursor: pointer;
  width: 128px;
  display: block;

  img {
    width: 128px;
    height: auto;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 960px) {
    top: 44px;
    left: 16px;
    width: 118px;

    img {
      width: 118px;
    }
  }

  @media (max-width: 768px) {
    width: 108px;

    img {
      width: 108px;
      height: 20.85px;
    }
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 1240px) {
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-end;
    order: 3;

    @media (max-width: 1240px) {
      order: 2;
    }
  }
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  order: 2;
`;

export const HamburgerBtn = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

export const UserMenu = styled.div`
  position: relative;

  .user-icon {
    color: ${(props) => props.theme.colors.accent};
    transition: transform 0.2s ease;
    cursor: pointer;

    @media (max-width: 900px) {
      display: none;
    }
  }

  &:hover .user-icon {
    transform: scale(1.1);
  }

  .dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background: rgba(26, 28, 32, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 8px;
    padding: 8px;
    min-width: 150px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;

    a,
    button {
      display: block;
      padding: 12px 16px;
      color: ${(props) => props.theme.colors.text};
      text-decoration: none;
      background: transparent;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: rgba(26, 28, 32, 0.76);
        color: ${(props) => props.theme.colors.accent};
      }
    }
  }

  &:hover .dropdown {
    display: block;
  }
`;

export const BellIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 900px) {
    display: block;
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;
