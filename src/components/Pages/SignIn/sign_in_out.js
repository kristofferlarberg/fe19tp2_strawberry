
import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut';


const UserStatus = () => {
    return ( <AuthUserContext.Consumer>
        {authUser => 
        authUser ? <SignOut UserEmail={authUser.email}/> : <SignInForm/>
        }
    </AuthUserContext.Consumer> );
}
 
const SignOut = ({UserEmail}) => {
    return ( <div >
        Hello user {UserEmail}
        <SignOutButton />
    </div> );
}
 
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};


class SignInFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password).then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                        </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
const SignInForm = compose(
    withFirebase,
)(SignInFormBase);

export default UserStatus;