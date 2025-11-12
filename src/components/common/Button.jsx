import styled from "@emotion/styled";
import Typography from "./Typhography";

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${(props) => props.theme.font.family};
  transition: all 0.3s ease;

  ${(props) =>
    props.$variant === "primary" &&
    `
    background: ${props.theme.colors.accent};
    color: #fff;
    border: none;
    
    &:hover {
      opacity: 0.8;
    }
    
    &:disabled {
      background: ${props.theme.colors.disabled};
      cursor: not-allowed;
    }
  `}

  ${(props) =>
    props.$variant === "secondary" &&
    `
    background: transparent;
    border: 1px solid ${props.theme.colors.accent};
    color: ${props.theme.colors.accent};
    
    &:hover {
      background: ${props.theme.colors.accent};
      color: #fff;
    }
    
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `}
`;

const Button = ({
  label,
  variant = "primary",
  disabled,
  onClick,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <Typography variant="caption">{children || label}</Typography>
    </StyledButton>
  );
};

export default Button;
