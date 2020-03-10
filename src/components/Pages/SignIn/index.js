import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import styled from 'styled-components';

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
const ButtonColor = styled.button`
background: ${props =>
    props.disabled ? '#ff6681' : 'red'} ;
`

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

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
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Email Address'
                />
                <Input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type='password'
                    placeholder='Password'
                />
                {/*                 <div>
                <span className="close" onClick={this.togglePop} >
                    &times;
          </span></div> */}
                <div style={{ marginBottom: '15px', marginTop: '15px' }}><ButtonColor disabled={isInvalid} type="submit" style={{
                    outline: 'none', border: 'none', padding: '10px', fontFamily: 'Roboto', fontWeight: '500', fontSize: '0.8em', color: 'white', textTransform: 'uppercase',
                    marginRight: '5px'
                }}>
                    Logga in
                        </ButtonColor>
                    <button type="button" style={{
                        outline: 'none', background: 'red', border: 'none', padding: '10px', fontFamily: 'Roboto', fontWeight: '500', fontSize: '0.8em', color: 'white', textTransform: 'uppercase'
                    }} onClick={(e) => this.props.handleClick(e)} >{this.props.title}</button>
                    {error && <p>{error.message}</p>}</div>
                {error && console.error(error.message)}

            </MyForm>
        );
    }
}
const SignInForm = compose(
    withFirebase,
)(SignInFormBase);

export default SignInForm
