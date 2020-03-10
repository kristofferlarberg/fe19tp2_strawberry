import React from 'react';
import * as ROLES from '../../../constants/roles';
import { withAuthorization, AuthUserContext } from '../../Session';

const NoAccesPAge = () => {
    return (<AuthUserContext.Consumer> 
        {authUser =>  
        <div>
            <h1>Sorry {authUser.email} you have no longer access</h1>
        </div>
        }

    </AuthUserContext.Consumer> );
}
 


const condition = authUser =>
    authUser && !!authUser.roles[ROLES.NO_ACCESS];

export default withAuthorization(condition)(NoAccesPAge);

