import React, { Component } from 'react';
import { AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut';
import SignUpForm from '../SignUp'
import SignInForm from '../SignIn'


const UserStatus = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <UserLoggedIn UserEmail={authUser.email} /> : <UserHaveAccount />
        }
    </AuthUserContext.Consumer>
);

const UserLoggedIn = ({ UserEmail }) => {
    return (<div >
        Hello user {UserEmail}
        <SignOutButton />
    </div>);
}

class UserHaveAccount extends Component {
    constructor(props) {
        super(props)
        this.state = { signUp: true }
    }
    handleClick = event => {
        event.preventDefault();
        if (this.state.signUp) {
            this.setState({ signUp: false })
        } else {
            this.setState({ signUp: true })
        }
    }
    render() {
        const { signUp } = this.state
        return (
            <div>
                <button onClick={this.handleClick} >{signUp ? 'No Account' : 'Have an Accont'}</button>
                {signUp ? <SignInForm /> : <SignUpForm />}
            </div>
        )
    }
}

export default UserStatus;
