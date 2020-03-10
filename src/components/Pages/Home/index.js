import React from 'react';
import Renderer from '../../Data/Renderer';
import Data from '../../Data';
import Side from '../../Side';
import { withAuthorization, withAuthentication } from '../../Session';
import Admin from '../Admin'
import * as ROLES from '../../../constants/roles';
import styled from 'styled-components'

const Main = styled.div`
    display: grid;
    grid-template-columns: 300px 10fr;
`

const HomePage = ({ authUser }) => (

    <Main>
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
    </Main>
);

//const condition = authUser => !!authUser;


const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(HomePage);