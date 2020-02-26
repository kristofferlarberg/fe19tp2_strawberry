import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
//  import Members from './components/Data/members';
//  import Data from './components/Data';
import LandingPage from './components/Pages/Landing'
import SignUpPage from './components/Pages/SignUp'
import HomePage from './components/Pages/Home'

// import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

import { findAllByDisplayValue } from '@testing-library/react';

class App extends React.Component {
  render() {

    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

export default withAuthentication(App);