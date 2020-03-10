import React, { Component } from 'react';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import {withAuthorization} from '../../Session';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';


class UserItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            user: null,
            ...props.location.state,
        };
    }

    componentDidMount() {
        if (this.state.user) {
            return;
        }

        this.setState({ loading: true });

        this.props.firebase
            .user(this.props.match.params.id)
            .on('value', snapshot => {
                this.setState({
                    user: snapshot.val(),
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
        this.props.firebase.doPasswordReset(this.state.user.email);
    };
    onChangeAcces = () => {
        const userID = this.state.user.uid
        console.log(userID)


        /* this.props.firebase.SecondSignIn(this.state.user.email,this.state.user.password).then(() => {
             this.props.firebase.isCurrentUser().delete().then(() => {
            this.props.firebase.db.ref('/users/'+ userID).remove()
        }).then(()=> {
            this.props.history.push(ROUTES.ADMIN);
        }).then(() => {
            console.log('User deleted');
        }).catch(function (error) {
            console.error(error)
        });
        }).catch(function (error) {
            console.log(error.message)
        } ) */
    }

    render() {
        const { user, loading } = this.state;

        return (
            <div>
                <h2>User ({this.props.match.params.id})</h2>
                {loading && <div>Loading ...</div>}

                {user && (
                    <div>
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
                            <button
                                type="button"
                                onClick={this.onSendPasswordResetEmail}
                            >
                                Send Password Reset
                            </button>
                            <button type='button'
                            onClick={this.onChangeAcces}>
                                Give User Access
                            </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}


const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
    withAuthorization(condition),
    withFirebase,
)(UserItem)