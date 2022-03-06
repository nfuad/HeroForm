/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the functions you need from the SDKs you need
// import { getAuth } from 'firebase/auth'
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0no2UGDmcxWjToqfmBQwvjph0k5GqLQo",
  authDomain: "inquire-dev-dbd89.firebaseapp.com",
  projectId: "inquire-dev-dbd89",
  storageBucket: "inquire-dev-dbd89.appspot.com",
  messagingSenderId: "537616956281",
  appId: "1:537616956281:web:4100dbfb4c1533ae0c0da8",
};

// Initialize Firebase

const createFirebaseApp = (config = {}) => {
  try {
    return getApp();
  } catch (ex) {
    return initializeApp(config);
  }
};

const firebaseApp = createFirebaseApp(firebaseConfig);
export const db = getFirestore();
export default firebaseApp;
