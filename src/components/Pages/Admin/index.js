import React , {Component} from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import { UserList, UserItem } from '../Users';
import SignUpForm2 from '../SignUp/admin-signup'
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';


class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      addUser:false
     }
  }
  StateBolean = event => {
    event.preventDefault();
    if (this.state.addUser) {
      this.setState({addUser:false})
    } else {
      this.setState({addUser:true})
    }
  }
  render() { 
    const {addUser} = this.state
    return (  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <button onClick={this.StateBolean} >Add User</button>
    {addUser ?  <SignUpForm2 /> : null }
    <AdminList />
  </div> 
  );
  }
}
 
const AdminList = () => (
  <div>
    <Link to={ROUTES.ADMIN}>Användarlista</Link>
  {/*   <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch> */}
  </div>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition))(AdminPage);
