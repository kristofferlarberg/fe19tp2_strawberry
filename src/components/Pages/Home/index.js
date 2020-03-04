import React from 'react';
import Renderer from '../../Data/Renderer';
import Data from '../../Data';
import Side from '../../Side';
import { AuthUserContext } from '../../Session';
import Admin from '../Admin'



const HomePage = () => (
    <div style={{ display: 'flex' }}>
        <Side />
        <AuthUserContext.Consumer>
            {authUser =>
                authUser &&
                    authUser.email.includes('admin') ?
                    <div>
                        <Admin />
                    </div>
                    : <Data>
                        <Renderer />
                    </Data>
            }
        </AuthUserContext.Consumer>

    </div>
);

//const condition = authUser => !!authUser;




export default HomePage;