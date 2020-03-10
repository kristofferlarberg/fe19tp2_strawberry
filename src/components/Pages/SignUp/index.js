import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import * as ROLES from '../../../constants/roles';
import styled from 'styled-components';

const MyForm = styled.form`
    width: auto;
`;

const Input = styled.input`
    background: transparent;
    padding: 10px;
    width: 180px;
    border: none;
    border-bottom: 1px solid #838383;
    /* border-radius:5px; */
    margin-bottom: 10px;
    font-family: Roboto;
    font-size: 1em;
    outline: none;
`;

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isAdmin: false
};

const SignUpPage = () => {
    return <SignUpForm />;
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin } = this.state;
        const roles = {};
        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    roles
                });
            })
            .then(() => {
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
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            isAdmin
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <MyForm onSubmit={this.onSubmit}>
                <Input
                    name='username'
                    value={username}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Fullständigt namn'
                />
                <Input
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Mejladress'
                />
                <Input
                    name='passwordOne'
                    value={passwordOne}
                    onChange={this.onChange}
                    type='password'
                    placeholder='Lösenord'
                />
                <Input
                    name='passwordTwo'
                    value={passwordTwo}
                    onChange={this.onChange}
                    type='password'
                    placeholder='Bekräfta lösenord'
                />
                <label>
                    Admin:
                    <input
                        name='isAdmin'
                        type='checkbox'
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                <button disabled={isInvalid} type='submit'>
                    Sign Up
                </button>
                {error && <p>{error.message}</p>}
            </MyForm>
        );
    }
}

const SignUpLink = () => <p>Don't have an account?</p>;

const SignUpForm = compose(withFirebase)(SignUpFormBase);

export { SignUpForm, SignUpLink };

export default SignUpPage;
