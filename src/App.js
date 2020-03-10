import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import HomePage from './components/Pages/Home';
import { withAuthentication, AuthUserContext } from './components/Session';
import LoadingDots from './components/LoadingDots';

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
                            <HomePage authUser={authUser} />
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
