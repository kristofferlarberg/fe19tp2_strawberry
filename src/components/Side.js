import React, { Component } from 'react';
import styled from 'styled-components';
import Search from './Search';
// import { DataConsumer } from 'data/DataConsumer';
// import { getVoteData } from '../functions/filter';
import Renderer from './Data/Renderer';

class Side extends React.Component {
    render() {

        return (
            <div style={{ minWidth: '200px', height: '100vh', background: '#DDD' }}>
{/*                 <Search
                    handleChange={this.handleChange}
                /> */}
            </div>
        );
    }
}

export default Side;