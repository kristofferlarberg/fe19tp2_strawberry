import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut';
import styled from 'styled-components';
import SignUpForm from '../SignUp'
import SignInPage from '.';

const MyForm = styled.form`
width:auto;
margin-top:5px;
margin-bottom:10px;
`

const Input = styled.input`
background: transparent;
padding: 10px;
width: 100%;
border: none;
border-bottom: 1px solid #838383;
/* border-radius:5px; */
margin-bottom:10px;
font-family:Roboto;
font-size:1.1em;
outline: none;
`

const UserStatus = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                    <SignOut UserEmail={authUser.email} />
                ) : (
                    <SignInBase />
                )
            }
        </AuthUserContext.Consumer>
    );
};

const SignOut = ({ UserEmail }) => {
    return (
        <div>
            Hello user {UserEmail}
            <SignOutButton />
        </div>
    );
};

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

class SignInBase extends Component {
    constructor(props) {
        super(props)
        this.state = { signUp: true }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = event => {
        console.log("YO")
        event.preventDefault();
        if (this.state.signUp) {
            this.setState({ signUp: false });
        } else {
            this.setState({ signUp: true });
        }
        // this.setState({signUp: !this.state.signUp})
    }
    render() {
        const { signUp } = this.state;
        return (
            <div>

                {/*     {signUp ? <SignInForm /> : <SignUpForm />}
                <button onClick={this.handleClick} >{signUp ? 'Nytt konto' : 'Jag har ett konto'}</button>
 */}
                {signUp ? <SignInForm title={'Nytt konto'} handleClick={this.handleClick} /> : <SignUpForm title={'Jag har ett konto'} handleClick={this.handleClick} />}
                {/* <button onClick={this.handleClick} >{signUp ? 'Nytt konto' : 'Jag har ett konto'}</button> */}

            </div>
        );
    }
}

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
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
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <MyForm onSubmit={this.onSubmit}>
                <Input
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Mejladress'
                />
                <Input
                    name='password'
                    value={password}
                    onChange={this.onChange}
                    type='password'
                    placeholder='Lösenord'
                />
                {/*                 <div>
                <span className="close" onClick={this.togglePop} >
                    &times;
          </span></div> */}

                <div style={{marginBottom:'15px', marginTop:'15px'}}><button disabled={isInvalid} type="submit" style={{
                    background: 'red', border: 'none', padding: '10px', fontFamily: 'Roboto', fontWeight: '500', fontSize: '0.8em', color: 'white', textTransform: 'uppercase',
                marginRight:'5px'}}>
                    Logga in
                        </button>
                <button type="button" style={{
                    background: 'red', border: 'none', padding: '10px', fontFamily: 'Roboto', fontWeight:'500', fontSize: '0.8em',color:'white', textTransform: 'uppercase'  }}onClick={(e) => this.props.handleClick(e)} >{this.props.title}</button>
                    {error && <p>{error.message}</p>}</div>

            </MyForm>
        );
    }
}
const SignInForm = compose(withFirebase)(SignInFormBase);

export default UserStatus;
