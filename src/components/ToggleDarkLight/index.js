import React from 'react';
import Toggle from './Toggle';
import { ToggleP } from './Toggle.styled';

const ToggleDarkLight = ({ theme, toggleTheme }) => {
    return (
        <>
            <ToggleP>
                {theme === 'light'
                    ? 'Switch to dark mode'
                    : 'Switch to light mode'}
            </ToggleP>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
        </>
    );
};

export default ToggleDarkLight;
