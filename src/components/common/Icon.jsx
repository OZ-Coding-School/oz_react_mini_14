import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faUser,
  faBell,
  faBars,
  faXmark,
  faChevronRight,
  faChevronLeft,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";

//아이콘 매핑
const ICONS = {
  heartSolid: faHeartSolid,
  heartRegular: faHeartRegular,
  starSolid: faStarSolid,
  starRegular: faStarRegular,
  user: faUser,
  bell: faBell,
  bars: faBars,
  xmark: faXmark,
  chevronRight: faChevronRight,
  chevronLeft: faChevronLeft,
};

const StyledIcon = styled(FontAwesomeIcon, {
  shouldForwardProp: (prop) => prop !== "$size",
})`
  font-size: ${(props) => props.$size || "24px"};
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  color: ${(props) => props.color || props.theme.colors.text};
  transition: transform 0.3s ease;
`;

const Icon = ({
  name,
  className,
  onClick,
  size = "24px",
  color,
  label,
  ...rest
}) => {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <StyledIcon
      icon={icon}
      className={className}
      onClick={onClick}
      $size={size}
      color={color}
      aria-label={label}
      {...rest}
    />
  );
};

export default Icon;
