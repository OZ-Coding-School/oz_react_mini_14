import { Link } from "react-router-dom";
import styled from "styled-components";

const Categories = () => {
  return (
    <MenuWrap>
      <Menu>
        <Link to="/">홈</Link>
        <Link to="/">KINE's Pick</Link>
        <Link to="/">커뮤니티</Link>
        <Link to="/">나의 KINEMA</Link>
      </Menu>
    </MenuWrap>
  );
};

export default Categories;

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 288px;
`;

const Menu = styled.ul`
  display: flex;
  gap: 60px;
  list-style: none;

  a {
    text-decoration: none;
    color: #fff; /* 기본 글자색 */
    font-weight: 500;
    transition: color 0.3s;

    &.active {
      color: #ff1a66; /* 활성화 색상 */
    }

    &:hover {
      color: #ff1a66;
    }
  }

  @media (max-width: 1240px) {
    display: none;
  }
`;
