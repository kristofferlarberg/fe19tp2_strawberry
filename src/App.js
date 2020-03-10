import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//  import Members from './components/Data/members';
//  import Data from './components/Data';
import LandingPage from './components/Pages/Landing'
import { UserList, UserItem } from './components/Pages/Users';
//import SignUpPage from './components/Pages/SignUp'
import './App.css'
import HomePage from './components/Pages/Home'

 import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

import Side from './components/Side';
import DocPopup from './components/Data/DocPopup';
import { findAllByDisplayValue } from '@testing-library/react';
import './App.css';

class App extends React.Component {
  render() {

    return (
      <Router>
        <div>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.ADMIN} component={UserList} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);