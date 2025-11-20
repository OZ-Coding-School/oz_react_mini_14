import styled from "@emotion/styled";
import Typography from "./Typography";

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

  /* 🔥 watch variant 추가 */
  ${(props) =>
    props.$variant === "watch" &&
    `
    width: 174px;
    height: 51px;
    background: transparent;
    color: #aeb3be;
    border: 1px solid #aeb3be;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    &:hover:not(:disabled) {
      background: #aeb3be;
      color: #1a1c20
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.5;
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
      <Typography
        variant="caption"
        style={
          variant === "watch" ? { fontSize: "16px", fontWeight: "600" } : {}
        }
      >
        {children || label}
      </Typography>
    </StyledButton>
  );
};

export default Button;
