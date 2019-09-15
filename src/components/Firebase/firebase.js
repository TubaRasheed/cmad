import 'firebase/database';
import app from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDyRMXwHIQvNCgAV42rJwTdhUZqL5ffpTo",
    authDomain: "fitness-club-a8fb5.firebaseapp.com",
    databaseURL: "https://fitness-club-a8fb5.firebaseio.com",
    projectId: "fitness-club-a8fb5",
    storageBucket: "",
    messagingSenderId: "430895666379",
    appId: "1:430895666379:web:992073c26e14c965"
  };
class firebaseConfig {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.database();
      this.googleProvider = new app.auth.GoogleAuthProvider();
      this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = () => this.auth.signOut();
    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}
  
  
  export default firebaseConfig ;



//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>