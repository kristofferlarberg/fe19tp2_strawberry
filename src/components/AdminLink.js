import React from 'react';
import { AuthUserContext } from './Session';
import { Link } from 'react-router-dom';
import * as ROLES from '../constants/roles';
//import {compose} from 'recompose'
import * as ROUTES from '../constants/routes';

const AdminLink = () => {
    return (
        <AuthUserContext.Consumer>
            {authUser => authUser ? <div>
                {authUser.roles[ROLES.ADMIN] ? <Link
                    to={ROUTES.ADMIN}
                    style={{
                        border: 'none',
                        padding: '10px',
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        fontSize: '0.8em',
                        color: 'white',
                        textTransform: 'uppercase',
                        marginRight: '5px',
                        background: 'red',
                        textDecoration: 'none'
                    }}
                >
                    Admin
                                        </Link> : null}

            </div> : null}

        </AuthUserContext.Consumer>
    );
}

export default AdminLink;