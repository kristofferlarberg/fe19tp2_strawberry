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
    /*
   apiKey: "AIzaSyCPTT_pkNMNRhdv6yDB_KO32aehULmfV9I",
  authDomain: "fir-tour-a44c0.firebaseapp.com",
  databaseURL: "https://fir-tour-a44c0.firebaseio.com",
  projectId: "fir-tour-a44c0",
  storageBucket: "fir-tour-a44c0.appspot.com",
  messagingSenderId: "48200388418",
  appId: "1:48200388418:web:36dddbf4dcabaf0a6b82db"
     
*/
};
var secondaryApp = app.initializeApp(config, "Secondary");

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.secondAuth = secondaryApp.auth()
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***
// *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
}
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
};
            next(authUser);
          });
      } else {
        fallback();
} });
    isCurrentUser = () => this.secondAuth.currentUser;
    
    AdminCreateUser = (email, password) => this.secondAuth.createUserWithEmailAndPassword(email, password);


    SignOutNewUser = ()  => this.secondAuth.signOut();

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

}

export default Firebase