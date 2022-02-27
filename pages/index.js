import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";

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
      console.log({ result, credential, token, user });
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
  const copiedIdToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjYjZiZTUxZWZlYTZhNDE5ZWM5MzI1ZmVhYTFlYzQ2NjBmNWIzN2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTM3NjE2OTU2MjgxLXVuczZ2ZXM4aTZ2M21iZWI3ZXFrZzFia3RsOWZya2x1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTM3NjE2OTU2MjgxLXVuczZ2ZXM4aTZ2M21iZWI3ZXFrZzFia3RsOWZya2x1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwODczMDQ4MjI3ODE4MzIyNjQ3IiwiZW1haWwiOiJmdWFkYmQxNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InByZ1J6bGgyS1ByLWx0YmxOV0xfS1EiLCJpYXQiOjE2NDU5NDQ1MDAsImV4cCI6MTY0NTk0ODEwMH0.v_s3crWmLADjSrQM5K85ARY6d1oYHX79JhXZFVcNlMY36i_ylXw-0wt40bk04WUjZlQ6uMcO2GattatX-xjRHd5dMeF77zCE31SRSuawAtxtXg4yA7QlwXsx9q24H5cZkMjFqElpt-V2W5BT-NJ9naqyDF6u6RmfiTrB_T6tenwD5TxWKAkokXksOzxU6MYtxM6nNb8Jr5dnA8V-eNrNI_OKRxg-JMqyG-2kNPRyLhZQx2tCwtmM2HuxYyqUzKIqOUUca1l-YMYQIdNuMd2Tpqe9_PsawfkWe9D09ZeiYqRJMFNlYVjYxKTPrKCZZwzhs7i3NatQFOQ9Q1eJ_Hc0yg";
  const copiedToken =
    "ya29.A0ARrdaM96vT3Tam_m8qWaIRrz4FO-RtDWvZk_vjSD-RxRg1wsNlxLsKtnEZqqRIdAcvhG2g-OzImI880YWl-VSKoXkj0D69DhInZ4-RUVoSOVNO1RRYyKcWEh5XWbGTiollGof4wSdkyVed3O1fDrRbmAB6oT";

  useEffect(() => {
    //       // adding / removing sheets
    // const newSheet = await doc.addSheet({ title: 'hot new sheet!' });

    const { OAuth2Client } = require("google-auth-library");

    // Initialize the OAuth2Client with your app's oauth credentials
    const oauthClient = new OAuth2Client({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    });
  }, []);

  return (
    <div className={styles.container}>
      {/* <Head>
        <script
          async
          defer
          src="https://apis.google.com/js/api.js"
          onload="this.onload=function(){};handleClientLoad()"
          onreadystatechange="if (this.readyState === 'complete') this.onload()"
        ></script>
      </Head> */}
      <button onClick={() => signInWithGoogle()}>Click Here</button>
      <button
      // onClick={() => {
      //   axios;
      // }}
      >
        sdfsd
      </button>
    </div>
  );
}
