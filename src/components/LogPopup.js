import React, { Component } from 'react'
import UserStatus from './Pages/SignIn/sign_in_out'
import styled from 'styled-components';
<<<<<<< HEAD
import SettingsBox from './Styles/settingsBox';
=======

const DocBoxShadow = styled.div`
display:flex;
  /* box-shadow: 0px 0px 15px #aaa; */
  margin: 0;
  width: 180px;
  height: auto;
  /* border-radius: 10px; */
  /* padding: 15px; */
  background: #DDD;
  /* z-index:1; */

`
>>>>>>> bbfd7f9312a9ec43aea730fd6ff2d7bdc5e8a918

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
