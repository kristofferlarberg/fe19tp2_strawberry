import React from 'react';
import Renderer from '../../Data/Renderer';
import Data from '../../Data';
import Side from '../../Side';

const HomePage = () => (
    <div style={{ display: 'flex' }}>
        <Side />
        <Data>
            <Renderer />
        </Data>
    </div>
);
// const condition = authUser => !!authUser;

export default HomePage;