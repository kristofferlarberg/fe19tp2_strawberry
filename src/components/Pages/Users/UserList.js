import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import {withAuthorization} from '../../Session';





class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
    this.addAccess = this.addAccess.bind(this);

    this.removeAccess = this.removeAccess.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  addAccess(user) {
    if (!user) {
      console.log("User needed!")
      return;
    }
let uid = user.uid;
    //let roles = user.roles;
    user.roles[ROLES.NO_ACCESS] = null;
    user.roles[ROLES.ACCESS] = ROLES.ACCESS;
    //console.log(user);
    user.uid = null;
    this.props.firebase.user(uid).set({
      ...user,
    });

  }
  removeAccess(user) {
    if (!user) {
      console.log("User needed!")
      return;
    }
    let uid = user.uid;

    //let roles = user.roles;
    user.roles[ROLES.ACCESS] = null;
    user.roles[ROLES.NO_ACCESS] = ROLES.NO_ACCESS;
    //console.log(user);
    user.uid = null;
    this.props.firebase.user(uid).set({
      ...user,
    });

  }
  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}

        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <span>
                <strong>Access:</strong> {user.roles ? user.roles[ROLES.ACCESS] ? (<button onClick={() => this.removeAccess(user)}>REVOKE</button>) : (<button onClick={() => this.addAccess(user)}>GRANT</button>) : 'noRoles'}
              </span>
              <span>
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                    state: { user },
                  }}
                >
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase,
)(UserList)
