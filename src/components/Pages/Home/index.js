import React from 'react';
import Renderer from '../../Data/Renderer';
import Data from '../../Data';
import Side from '../../Side';
import { withAuthorization} from '../../Session';
import Admin from '../Admin'
import * as ROLES from '../../../constants/roles';


const HomePage = ({ authUser }) => (
    <div style={{ display: 'flex' }}>
        <Side />
        {authUser &&
            authUser.roles[ROLES.ADMIN] === ROLES.ADMIN ?
            <div>
                <Data>
                    {/* <Renderer authUser={authUser} /> */}
                    <Admin />
                </Data>
            </div>
            : <Data>
                <Renderer authUser={authUser} />
            </Data>
        }

    </div>
);

//const condition = authUser => !!authUser;


const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ACCESS];

export default withAuthorization(condition)(HomePage);