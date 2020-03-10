import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Styles/theme';
import { GlobalStyles } from '../Styles/global';
import Toggle from './Toggle';

const ToggleDarkLight = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <p>{`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}</p>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
        </ThemeProvider>
    );
};

export default ToggleDarkLight;
