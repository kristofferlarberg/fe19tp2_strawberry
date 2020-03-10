import React, { useState } from 'react';
import { ThemeProvider, styled } from 'styled-components';
import { lightTheme, darkTheme } from '../Styles/theme';
import { GlobalStyles } from '../Styles/global';
import Toggle from './Toggle';
import SettingsBox from '../Styles/settingsBox';



const ToggleDarkLight = () => {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === 'light') {
      setTheme('dark');
      // otherwise, it should be light
    } else {
      setTheme('light');
    }
  }

  return (

    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <p>{theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</p>
      <Toggle theme={theme} toggleTheme={toggleTheme} />
    </ThemeProvider>

  );
}

export default ToggleDarkLight;