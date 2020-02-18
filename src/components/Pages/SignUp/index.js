import React from 'react';
import { Link} from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

const SignUpPage = () => {
    return ( 
        <div>
            <h1>Sign up</h1>
            <form>
                <input placeholder="Full Name"></input>
                <input placeholder="Email"></input>
                <input placeholder="Password"></input>
                <input placeholder="Password"></input>
                <button>Submit</button>
            </form>
        </div>
    );
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

export { SignUpLink}
 
export default SignUpPage;