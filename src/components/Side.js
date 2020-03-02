import React, { Component } from 'react';
import styled from 'styled-components';
import Search from './Search';
// import { DataConsumer } from 'data/DataConsumer';
import { getVoteData } from '../functions/filter';


export default class Side extends React.Component {


    render() {
        return (
            <div style={{ minWidth: '300px', width: '300px', height: '100vh', background: '#DDD' }}>
                Side menu
            </div>
        );
    }
}