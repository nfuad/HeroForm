import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react/cjs/react.production.min";
import axios from "axios";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0no2UGDmcxWjToqfmBQwvjph0k5GqLQo",
  authDomain: "inquire-dev-dbd89.firebaseapp.com",
  projectId: "inquire-dev-dbd89",
  storageBucket: "inquire-dev-dbd89.appspot.com",
  messagingSenderId: "537616956281",
  appId: "1:537616956281:web:4100dbfb4c1533ae0c0da8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/spreadsheets");

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const idToken = credential.idToken;
      // The signed-in user info.
      const user = result.user;
      console.log({ result, credential, token, user, idToken });
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export default function Home() {
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log("user", user);
        axios
          .post("/api/hello", {
            idToken: user.refreshToken,
          })
          .then((res) => console.log("res", res))
          .catch((err) => console.log("err", err));
      } else {
        // No user is signed in.
        console.log("No user is signed in.");
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <button onClick={() => signInWithGoogle()}>Click Here</button>
      <button>sdfsd</button>
    </div>
  );
}
