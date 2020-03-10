import React from 'react';
import Renderer from '../../Data/Renderer';
import Data from '../../Data';
import Side from '../../Side';
import { withAuthorization } from '../../Session';
import Admin from '../Admin';
import * as ROLES from '../../../constants/roles';

const HomePage = ({ authUser, firebase }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Side authUser={authUser} firebase={firebase} />
            <Data>
                {authUser && authUser.roles[ROLES.ADMIN] === ROLES.ADMIN ? (
                    <Admin />
                ) : (
                    <Renderer authUser={authUser} />
                )}
            </Data>
        </div>
    );
};

//const condition = authUser => !!authUser;

const condition = authUser => authUser && authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(HomePage);
