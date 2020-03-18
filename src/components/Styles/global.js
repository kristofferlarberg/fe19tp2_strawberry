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

::-webkit-scrollbar {
  width: 0.5rem;
}

::-webkit-scrollbar-track {
  box-shadow: none; 
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.track};
}
 
::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.handle};
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.hover}; 
}

  h1 {
    color: ${({ theme }) => theme.text};
  }

  h3 {
    color: ${({ theme }) => theme.h3};
  }

  a, a:hover,a:active,a:visited {
    color: ${({ theme }) => theme.text};
  }

  .side {
    background: ${({ theme }) => theme.side};
  }

 
`;
