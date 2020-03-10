import React from 'react';
import { func, string } from 'prop-types';
import { ToggleContainer, CheckBox } from './Toggle.styled';

const Toggle = ({ theme, toggleTheme }) => {
    return (
        <>
            <CheckBox id='toggleThemeCheckbox' type='checkbox' />
            <ToggleContainer
                htmlFor='toggleThemeCheckbox'
                onClick={toggleTheme}
            />
        </>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired
};

export default Toggle;
