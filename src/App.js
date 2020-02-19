import React from 'react';
import Renderer from './components/Data/Renderer';
import Data from './components/Data';

class App extends React.Component {
  render() {

    return (
      <div>
        <Data>
          <Renderer />
        </Data>
      </div>
    );
  }
}

export default App;