import { Typography, Icon } from "@/components";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const UserSection = ({ loading, user, onLogout }) => {
  if (loading) {
    return <Typography variant="bodySmall">...</Typography>;
  }

  if (user) {
    return (
      <>
        <UserMenu>
          <Icon name="user" className="user-icon" size="24px" label="사용자" />
          <div className="dropdown">
            <Link to="/profile">
              <Typography variant="bodySmall">내 프로필</Typography>
            </Link>
            <button onClick={onLogout}>
              <Typography variant="bodySmall">로그아웃</Typography>
            </button>
          </div>
        </UserMenu>
        <BellIcon>
          <Icon name="bell" size="24px" label="알림" />
        </BellIcon>
      </>
    );
  }

  return (
    <Link to="/login" style={{ textDecoration: "none" }}>
      <Icon name="user" size="24px" label="로그인" className="user-icon" />
    </Link>
  );
};
export default UserSection;

const UserMenu = styled.div`
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

const BellIcon = styled.div`
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
