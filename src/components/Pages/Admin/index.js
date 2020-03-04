import React from 'react';
import { defaultProps } from 'recompose';
import { FirebaseContext, withFirebase } from '../../Firebase'

const AdminPage = () => {
    // var admin = require("firebase-admin");

    // var serviceAccount = require("./serviceAccountKey.json");

    // admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccount),
    //     databaseURL: "https://test-firebase-75c7c.firebaseio.com"
    // });
    // function listAllUsers(nextPageToken) {
    //     // List batch of users, 1000 at a time.
    //     admin.auth().listUsers(100)
    //         .then(function (listUsersResult) {
    //             listUsersResult.users.forEach(function (userRecord) {
    //                 console.log('user', userRecord.toJSON());
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log('Error listing users:', error);
    //         });
    // }

    return (<div>
        <h1>Admin</h1>
        {/* <button onClick={listAllUsers}>Klicka här!!!</button> */}
    </div>);
}

export default AdminPage;