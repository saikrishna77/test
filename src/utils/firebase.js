import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

const config = {
  apiKey: 'AIzaSyAhm0ISOdVs6ubw9Z2lLnTCaE3L4RgpJq0',
  authDomain: 'ccap-21cd3.firebaseapp.com',
  databaseURL: 'https://ccap-21cd3.firebaseio.com',
  projectId: 'ccap-21cd3',
  storageBucket: 'ccap-21cd3.appspot.com',
  messagingSenderId: '962809932067',
  appId: '1:962809932067:web:e4fc1de0659280c88a0496',
  measurementId: 'G-K5MFPQ72L2'
};

const exportSetting = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(config);
  } else {
    return firebase.app();
  }
};

export default exportSetting();

// class Firebase {
//   constructor() {
//     app.initializeApp(firebaseConfig);
//     this.auth = app.auth();
//   }
//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

//   doCreateUserWithEmailAndPassword = (email, password) =>
//     this.auth.createUserWithEmailAndPassword(email, password);

//   doSignOut = () => this.auth.signOut();

//   getAuth = () => {
//     return this.auth;
//   };
//   getDb = () => {
//     return this.app.firestore();
//   };
// }
// export default Firebase;
