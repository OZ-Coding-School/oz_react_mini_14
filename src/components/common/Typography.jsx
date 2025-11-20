import styled from "@emotion/styled";

const typographyVariants = {
  //헤딩
  h1: `
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 24px;
      }
    `,
  h2: `
      font-size: 28px;
      font-weight: 700;
      line-height: auto;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    `,
  h3: `
      font-size: 24px;
      font-weight: 500;
      line-height: auto;
    `,
  h4: `
      font-size: 20px;
      font-weight: 500;
      line-height: auto;
    `,

  //본문
  body: `
      font-size: 20px;
      font-weight: 400;
      line-height: 1.3;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    `,

  bodyMedium: `
      font-size: 18px;
      font-weight: 400;
      line-height: 1.5;
    `,

  bodySmall: `
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;
    `,

  //캡션
  caption: `
      font-size: 14px;
      font-weight: 300;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    `,

  //섹션타이틀
  sectionTitle: `
      font-size: 24px;
      font-weight: 700;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    `,

  //영화타이틀(카드)
  movieTitle: `
      font-size: 14px;
      font-weight: 500;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
};

const StyledTypography = styled.span`
  color: ${(props) => props.color || props.theme.colors.text};
  font-family: ${(props) => props.theme.font.family};
  margin: 0;
  ${(props) => typographyVariants[props.$variant] || typographyVariants.body}
`;

const Typography = ({
  variant = "body",
  color,
  children,
  tag = "span",
  ...props
}) => {
  return (
    <StyledTypography as={tag} $variant={variant} color={color} {...props}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
