import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.$size || "24px"};
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  color: ${(props) => props.color || props.theme.colors.text};
  transition: transform 0.3s ease;

  &.user {
    @media (max-width: 900px) {
      display: none;
    }
  }

  &.bell {
    display: none;
    @media (max-width: 900px) {
      display: block;
    }
  }

  &:hover {
    ${(props) => props.onClick && `transform: scale(1.1);`}
  }
`;

const Icon = ({ icon, className, onClick, size = "24px", color, label }) => {
  return (
    <StyledIcon
      icon={icon}
      className={className}
      onClick={onClick}
      $size={size}
      color={color}
      aria-label={label}
    />
  );
};

export default Icon;
