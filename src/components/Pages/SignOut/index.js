import React from 'react';

import { withFirebase } from '../../Firebase';

const SignOutButton = ({ firebase }) => (
    <button style={{
        border: 'none', padding: '10px', fontFamily: 'Roboto', fontWeight: '500', fontSize: '0.8em', color: 'white', textTransform: 'uppercase',
        marginRight: '5px',background: 'red'}} type="button" onClick={firebase.doSignOut}>
        Logga ut
    </button>
);

export default withFirebase(SignOutButton);