import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut';
import SignUpForm from '../SignUp';
import SignInForm from '../SignIn';
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';

const UserStatus = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <UserLoggedIn
                    UserEmail={authUser.email}
                    userRoles={authUser.roles}
                />
            ) : (
                <UserHaveAccount />
            )
        }
    </AuthUserContext.Consumer>
);

const UserLoggedIn = ({ UserEmail, userRoles }) => {
    return (
        <div>
            Hello user {UserEmail}
            <SignOutButton />
            {userRoles[ROLES.ADMIN] ? (
                <Link
                    to={ROUTES.ADMIN}
                    style={{
                        border: 'none',
                        padding: '10px',
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        fontSize: '0.8em',
                        color: 'white',
                        textTransform: 'uppercase',
                        marginRight: '5px',
                        background: 'red',
                        textDecoration: 'none'
                    }}
                >
                    Admin
                </Link>
            ) : null}
        </div>
    );
};

class UserHaveAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { signUp: true };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = event => {
        event.preventDefault();
        if (this.state.signUp) {
            this.setState({ signUp: false });
        } else {
            this.setState({ signUp: true });
        }
        // this.setState({signUp: !this.state.signUp})
    };

    render() {
        const { signUp } = this.state;
        return (
            <div>
                {/* <button onClick={this.handleClick} >{signUp ? 'No Account' : 'Have an Accont'}</button>
                {signUp ? <SignInForm /> : <SignUpForm />} */}

                {signUp ? (
                    <SignInForm
                        title={'Nytt konto'}
                        handleClick={this.handleClick}
                    />
                ) : (
                    <SignUpForm
                        title={'Jag har ett konto'}
                        handleClick={this.handleClick}
                    />
                )}
            </div>
        );
    }
}

export default UserStatus;
