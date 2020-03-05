import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// my test Api config
var config = {
    /**
     * ! Your firebase API key
     */
    apiKey: "AIzaSyADWVa2qZ4xEdN2PuC6MRodxmsx84niNSQ",
    authDomain: "test-firebase-75c7c.firebaseapp.com",
    databaseURL: "https://test-firebase-75c7c.firebaseio.com",
    projectId: "test-firebase-75c7c",
    storageBucket: "test-firebase-75c7c.appspot.com",
    messagingSenderId: "194902267565",
    appId: "1:194902267565:web:9cf40dc976e1961d461824",
    measurementId: "G-6YHPZZ2BS5"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


}

export default Firebase