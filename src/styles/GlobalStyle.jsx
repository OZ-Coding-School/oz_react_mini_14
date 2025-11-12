import { Global, css, useTheme } from "@emotion/react";

export const GlobalStyle = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          position: relative;
          background: ${theme.colors.bg};
          color: ${theme.colors.text};
          min-height: 100vh;
          font-family: ${theme.font.family};
        }

        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
          background: ${theme.colors.overlay};
          pointer-events: none;
          z-index: 0;
        }

        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
      `}
    />
  );
};
