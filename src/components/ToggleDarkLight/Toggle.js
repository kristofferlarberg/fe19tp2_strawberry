import React from 'react'
import { func, string } from 'prop-types';
import { ToggleContainer, CheckBox } from './Toggle.styled';



const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (
    <>

      <CheckBox id="checkbox" type="checkbox" onClick={isLight} />
      <ToggleContainer htmlFor="checkbox" onClick={toggleTheme} />

    </>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle;