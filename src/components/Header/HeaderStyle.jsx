import styled from "styled-components";

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

  /* 모바일 */
  @media (max-width: 768px) {
    padding: 52px 16px 20px;
    backdrop-filter: blur(20px);
  }
`;

export const StyledTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 960px) {
    flex-wrap: wrap;
  }
`;

export const StyledLogo = styled.a`
  position: fixed;
  top: 20px;
  left: 100px;
  cursor: pointer;

  img {
    width: 128px;
    object-fit: contain;
  }

  @media (max-width: 960px) {
    top: 52px;
    left: 16px;

    img {
      width: 118px;
    }
  }

  @media (max-width: 768px) {
    top: 52px;
    left: 16px;

    img {
      width: 108px;
      height: 20.85px;
    }
  }
`;

export const StyledRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-end;
  }
`;

export const SearchBar = styled.input`
  width: 400px;
  height: 40px;
  background-color: rgba(217, 217, 217, 0.1);
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  border: 1px solid #fff;
  padding: 16px 12px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff1a66;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 1240px) {
    width: 100%;
    order: 3;
    margin-bottom: 12px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UserMenu = styled.div`
  position: relative;
  cursor: pointer;

  .dropdown {
    display: none;
    position: absolute;
    top: 40px;
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
      color: white;
      text-decoration: none;
      background: transparent;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: rgba(255, 26, 102, 0.1);
        color: #ff1a66;
      }
    }
  }

  &:hover .dropdown {
    display: block;
  }
`;
