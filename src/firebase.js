import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// initialize firebaseApp with firebase-config values
const firebaseConfig = {
  apiKey: "AIzaSyAc-vYxvtlV8xGZQiizEso1hyzy6KO9T0A",
  authDomain: "social-media-react-30b40.firebaseapp.com",
  projectId: "social-media-react-30b40",
  storageBucket: "social-media-react-30b40.appspot.com",
  messagingSenderId: "69292789065",
  appId: "1:69292789065:web:1a8ec7f0ccfeffd92f5e98",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// firebase - Data-Base
const db = app.firestore();

// firebase - Storage
const storage = firebase.storage();

// firebase - Auth
const auth = firebase.auth();

// firebase -Auth Provider (Google)
const provider = new firebase.auth.GoogleAuthProvider();

export { storage, auth, provider };

export default db;
