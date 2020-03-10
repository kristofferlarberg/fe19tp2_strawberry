import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserList, UserItem } from './components/Pages/Users';
import './App.css';
import HomePage from './components/Pages/Home';
import { withAuthentication, AuthUserContext } from './components/Session';
import LoadingDots from './components/LoadingDots';
import * as ROUTES from './constants/routes';

class App extends React.Component {
    state = {
        totalAuthCalls: 0,
        isAfterAuth: false
    };

    componentDidUpdate() {
        if (this.state.totalAuthCalls === 5 && !this.state.isAfterAuth) {
            this.setState({ isAfterAuth: true });
        } else {
            if (!this.state.isAfterAuth) {
                this.setState({
                    totalAuthCalls: this.state.totalAuthCalls + 1
                });
            }
        }
    }

    render() {
        return (
            <Router>
                <AuthUserContext.Consumer>
                    {authUser =>
                        this.state.isAfterAuth ? (
                            <>
                                <Route
                                    exact
                                    path={ROUTES.HOME}
                                    component={() => (
                                        <HomePage
                                            authUser={authUser}
                                            firebase={this.props.firebase}
                                        />
                                    )}
                                />
                                <Route
                                    path={ROUTES.ADMIN_DETAILS}
                                    component={() => (
                                        <UserItem
                                            authUser={authUser}
                                            firebase={this.props.firebase}
                                        />
                                    )}
                                />
                                <Route
                                    path={ROUTES.ADMIN}
                                    component={() => (
                                        <UserList
                                            authUser={authUser}
                                            firebase={this.props.firebase}
                                        />
                                    )}
                                />
                            </>
                        ) : (
                            <div
                                style={{
                                    marginLeft: '50vw',
                                    marginTop: '50vh'
                                }}
                            >
                                <LoadingDots />
                            </div>
                        )
                    }
                </AuthUserContext.Consumer>
            </Router>
        );
    }
}

export default withAuthentication(App);
