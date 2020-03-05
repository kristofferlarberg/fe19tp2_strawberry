import React, { Component } from 'react'
import UserStatus from './Pages/UserStatus'
import styled from 'styled-components';

const DocBoxShadow = styled.div`
display:flex;
  /* box-shadow: 0px 0px 15px #aaa; */
  margin: 0;
  width: 180px;
  height: auto;
  /* border-radius: 10px; */
  padding: 15px;
  background: #DDD;
  /* z-index:1; */

`

export class LogPopup extends Component {
    handleClick = () => {
        this.props.toggle();
    };
    render() {
        return (
            
            <DocBoxShadow><UserStatus /></DocBoxShadow>
            
        )
    }
}

export default LogPopup
