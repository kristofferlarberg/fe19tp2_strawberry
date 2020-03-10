import React, { Component } from 'react';
import * as ROLES from '../../../constants/roles';
import { withAuthorization } from '../../Session';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';

class UserItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            user: null,
            ...props.location.state
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
                    loading: false
                });
            });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
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
                                type='button'
                                onClick={this.onSendPasswordResetEmail}
                            >
                                Send Password Reset
                            </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(withAuthorization(condition), withFirebase)(UserItem);
