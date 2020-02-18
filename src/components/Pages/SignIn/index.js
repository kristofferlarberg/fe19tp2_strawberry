import React from 'react';
import { SignUpLink} from '../SignUp'

const SignInPage = () => {
    return ( <div>
        <h1>Sign in</h1>
        <input placeholder="Email"></input>
        <input placeholder="Password"></input>
        <button>Submit</button>
        <SignUpLink />
    </div> );
}

 
export default SignInPage;