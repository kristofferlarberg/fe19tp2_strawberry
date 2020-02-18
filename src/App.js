import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//  import Members from './components/Data/members';
//  import Data from './components/Data';
import LandingPage from './components/Pages/Landing'
import SignUpPage from './components/Pages/SignUp'
import HomePage from './components/Pages/Home'
import VoteringsPage from './components/Pages/VoteringPage'
import Navigation from './components/Pages/Navigation'
import SignInPage from './components/Pages/SignIn'
import AccountPage from './components/Pages/Account'
import AdminPage from './components/Pages/Admin'
import PasswordForgetPage from './components/Pages/PasswordForget'

import * as ROUTES from './constants/routes'

class App extends React.Component {
  render() {

    return (
      <div>
        <Router>
          <Navigation />
          <hr />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.VOTERING} component={VoteringsPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        </Router>
        {/*     <Data>
          <Members />
        </Data> */}
      </div>
    );
  }
}

export default App;