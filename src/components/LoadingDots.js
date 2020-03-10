import React, { Component } from 'react';

import styled, { keyframes } from 'styled-components';

const BounceAnimation = keyframes`
    0% { margin-bottom: 0; }
    50% { margin-bottom: 15px }
    100% { margin-bottom: 0 }
`;

const DotWrapper = styled.span`
    display: flex;
    align-items: flex-end;
`;

const Dot = styled.span`
    background-color: black;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin: 0 5px;
    animation: ${BounceAnimation} 0.5s linear infinite;
    animation-delay: ${props => props.delay};
`;

class LoadingDots extends Component {
    render() {
        return (
            <DotWrapper>
                <Dot delay='0s' />
                <Dot delay='.1s' />
                <Dot delay='.2s' />
            </DotWrapper>
        );
    }
}

export default LoadingDots;
