import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.grayBase};
  }

  h1 {
    font-family:  ${({ theme }) => theme.fonts.secondary};
    font-size: 38px;
    color: ${({ theme }) => theme.colors.black};
  }

  h3 {
    font-family:  ${({ theme }) => theme.fonts.secondary};
  }

  h4 {
    font-family:  ${({ theme }) => theme.fonts.primary};
    font-size: 16px;
  }

  a {
    color:${({ theme }) => theme.colors.linkColor};
    text-decoration: none;
  }

`;

export default GlobalStyle;
