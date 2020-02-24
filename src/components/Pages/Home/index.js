import React from 'react';
import { AuthUserContext, withAuthorization } from '../../Session';

const HomePage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Welcome {authUser.email}</h1>
                <p>The Home Page is accessible by every signed in user</p>
            </div>
        )}
    </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);