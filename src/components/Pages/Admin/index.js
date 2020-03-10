import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization } from '../../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';

const AdminPage = () => (
    <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>
        <Link to={ROUTES.ADMIN}>Användarlista</Link>
        <Switch>
            <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
            <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
    </div>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition))(AdminPage);
