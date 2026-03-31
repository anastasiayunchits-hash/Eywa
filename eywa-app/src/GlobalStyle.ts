import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.neutrals.charcoalGrey};
    color: ${theme.colors.neutrals.softOffWhite};
    font-family: ${theme.typography.primaryFont};
    font-size: ${theme.typography.baseFontSize};
    line-height: ${theme.typography.lineHeight};
    letter-spacing: ${theme.typography.letterSpacing};
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.displayFont};
    color: ${theme.colors.primary.softLavender};
  }

  * {
    box-sizing: border-box;
  }
`;
