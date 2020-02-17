import React from 'react';
import VoteringFilter from './components/VoteringFilter'
import Filter_vote from './components/Voterings-filter-id'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Data from './components/Data';

class App extends React.Component {
  render() {

    return (
      <div>
        {/* <VoteringFilter /> */}
        {/* <Filter_vote /> */}
        <Data />

      </div>
    );
  }
}

export default App;