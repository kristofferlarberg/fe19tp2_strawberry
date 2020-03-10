import React from 'react';
import Toggle from './Toggle';

const ToggleDarkLight = ({ theme, toggleTheme }) => {
    return (
        <>
            <p>
                {theme === 'light'
                    ? 'Switch to dark mode'
                    : 'Switch to light mode'}
            </p>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
        </>
    );
};

export default ToggleDarkLight;
