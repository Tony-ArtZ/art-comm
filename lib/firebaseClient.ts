import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'APIKEY',
    authDomain: 'myproject-123.firebaseapp.com',
    databaseURL: 'https://myproject-123.firebaseio.com',
    projectId: 'myproject-123',
    storageBucket: 'myproject-123.appspot.com',
    messagingSenderId: '123412341234',
    appId: '1:1234123412341234:web:1234123421342134d',
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export { firebase };