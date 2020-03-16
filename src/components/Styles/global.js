import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: Roboto, sans-serif;
  }

  h1 {
    color: ${({ theme }) => theme.text};
  }

  h3 {
    color: ${({ theme }) => theme.h3};
  }

  .side {
    background: ${({ theme }) => theme.side};
  }

  .icons {
    fill: ${({ theme }) => theme.icons};
  }
 
`;
