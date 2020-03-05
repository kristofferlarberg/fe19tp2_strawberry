
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
/* margin-top:10px; */
`

const Input = styled.input`
background:transparent;
padding: 10px;
width:180px;
border:none;
border-bottom: 1px solid #838383;
/* border-radius:5px; */
margin-bottom:10px;
font-family:Roboto;
font-size:1em;
outline: none;
`

const UserStatus = () => {
    return ( <AuthUserContext.Consumer>
        {authUser => 
        authUser ? <SignOut UserEmail={authUser.email}/> : <SignInBase/>
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

class SignInBase extends Component {
    constructor(props){
        super(props)
        this.state = {signUp : true}
    }
    handleClick = event => {
        event.preventDefault();
        if (this.state.signUp) {
            this.setState({signUp: false})
        } else {
            this.setState({signUp:true})
        }
    }
    render () {
        const {signUp} = this.state
        return (
            <div>
                
                {signUp ? <SignInForm /> : <SignUpForm />} 
                <button onClick={this.handleClick} >{signUp ? 'No Account' : 'Have an Accont'}</button>
            </div>
        )
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

            <MyForm onSubmit={this.onSubmit}>
                <Input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <Input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
{/*                 <div>
                <span className="close" onClick={this.togglePop} >
                    &times;
          </span></div> */}
                <button disabled={isInvalid} type="submit">
                    Logga in
                        </button>
                {error && <p>{error.message}</p>}
                
            </MyForm>
        );
    }
}
const SignInForm = compose(
    withFirebase,
)(SignInFormBase);

export default UserStatus;