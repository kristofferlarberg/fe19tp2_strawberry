import React from 'react';
import Members from './components/Data/members';
import Data from './components/Data';

class App extends React.Component {
  render() {

    return (
      <div>
        <Data>
          <Members />
        </Data>
      </div>
    );
  }
}

export default App;