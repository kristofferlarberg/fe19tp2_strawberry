import React, { Component } from 'react'
import UserStatus from './Pages/SignIn/sign_in_out'
import styled from 'styled-components';
import SettingsBox from './Styles/settingsBox';

export class LogPopup extends Component {
    handleClick = () => {
        this.props.toggle();
    };
    render() {
        return (
            <UserStatus />
        )
    }
}

export default LogPopup
