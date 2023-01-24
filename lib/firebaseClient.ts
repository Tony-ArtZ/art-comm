import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDJRQ3bI8inw7V4wIl_ZCuHNh26HVnsmSE",
    authDomain: "art-comm-97af9.firebaseapp.com",
    projectId: "art-comm-97af9",
    storageBucket: "art-comm-97af9.appspot.com",
    messagingSenderId: "684469929856",
    appId: "1:684469929856:web:7ab8426d637641c9a16365",
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export { firebase };
