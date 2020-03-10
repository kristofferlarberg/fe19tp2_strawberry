import React from 'react';

import { withFirebase } from '../../Firebase';

const SignOutButton = ({ firebase }) => (
    <button type='button' onClick={firebase.doSignOut}>
        Logga ut
    </button>
);

export default withFirebase(SignOutButton);
