import React, { useState } from 'react';
import { ThemeProvider, styled } from 'styled-components';
import { lightTheme, darkTheme } from '../Styles/theme';
import { GlobalStyles } from '../Styles/global';
import Toggle from './Toggle';
import SettingsBox from '../Styles/settingsBox';



const ToggleDarkLight = ({ theme, toggleTheme }) => {
  return (
    <>
      <p>{theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</p>
      <Toggle theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

export default ToggleDarkLight;