import React, { Component } from 'react';
import styled from 'styled-components';
import UserStatus from './Pages/SignIn/sign_in_out'
// import { DataConsumer } from 'data/DataConsumer';
// import { getVoteData } from '../functions/filter';


class Side extends React.Component {
    render() {

        return (
            <div style={{ minWidth: '200px', height: '100vh', background: '#DDD' }}>
                Side menu
                <UserStatus/>
            </div>
        );
    }
}

export default Side;