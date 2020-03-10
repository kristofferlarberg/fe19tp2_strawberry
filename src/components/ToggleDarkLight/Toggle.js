import React from 'react';
import { func, string } from 'prop-types';
import { ToggleContainer, CheckBox } from './Toggle.styled';

const Toggle = ({ theme, toggleTheme }) => {
    const isChecked = theme === 'dark';
    return (
        <>
            <CheckBox
                id='checkbox'
                type='checkbox'
                defaultChecked={isChecked}
            />
            <ToggleContainer htmlFor='checkbox' onClick={toggleTheme} />
        </>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired
};

export default Toggle;
