import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.$size || "24px"};
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  color: ${(props) => props.$color || "#fff"};

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
`;

const Icon = ({ icon, className, onClick, size, color, label }) => {
  return (
    <StyledFontAwesomeIcon
      icon={icon}
      className={className}
      onClick={onClick}
      $size={size}
      $color={color}
      aria-label={label}
    />
  );
};

export default Icon;
