import React from 'react';
import Renderer from './components/Data/Renderer';
import Data from './components/Data';
import Side from './components/Side';
import { findAllByDisplayValue } from '@testing-library/react';

class App extends React.Component {
  render() {

    return (
      <div style={{ display: 'flex' }}>
        <Side />
        <Data>
          <Renderer />
        </Data>
      </div>
    );
  }
}

export default App;