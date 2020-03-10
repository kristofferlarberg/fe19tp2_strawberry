import React , {Component} from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import { UserList, UserItem } from '../Users';
import SignUpPage2 from '../SignUp/admin-signup'
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
      <Link to={ROUTES.HOME} style={{
        border: 'none', padding: '10px', fontFamily: 'Roboto', fontWeight: '500', fontSize: '0.8em', color: 'white', textTransform: 'uppercase',
        marginRight: '5px', background: 'red', textDecoration: 'none'
      }} >Home</Link>
      <button style={{
        border: 'none', padding: '10px', fontFamily: 'Roboto', fontWeight: '500', fontSize: '0.8em', color: 'white', textTransform: 'uppercase',
        marginRight: '5px', background: 'red'
      }} onClick={this.StateBolean} >Add User</button>
    {addUser ?  <SignUpPage2 /> : null }
    <AdminList />
  </div> 
  );
  }
}
 
const AdminList = () => (
  <div>
   <UserList />
  </div>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
)(AdminPage);