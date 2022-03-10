import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useIntersectionObserver from "../hooks/use-intersection-observer";
import useDynamicRefs from "../hooks/use-dynamic-refs";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import RadioButton, { plans } from "../components/radio-button";
import { Transition } from "@headlessui/react";
import Screen from "../components/screen";

const signInWithGoogle = (setAccessToken) => {
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/spreadsheets')

  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const idToken = credential.idToken
      // The signed-in user info.
      const user = result.user
      console.log({ result, credential, token, user, idToken })
      setAccessToken(token)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}

export default function Home() {
  const auth = getAuth()

  const [accessToken, setAccessToken] = useState(null)

  const handleClick = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        axios
          .post('/api/hello', {
            token: accessToken,
          })
          .then((res) => console.log('res', res))
          .catch((err) => console.error('err', err))
      } else {
        console.log('No user is signed in.')
      }
    })
  }

  // const [textareaHeight, setTextareaHeight] = useState(100);
  const [inputs, setInputs] = useState<any>({});

  const questions = [
    "What do you like the most about the service?",
    "What is your most pressing problem for selling products through facebook right now?",
    "How much are you willing to pay for the service?",
  ];

  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const [selected, setSelected] = useState(plans[0]);
  // console.log("selected: ", selected);
  const answerObj = { input: inputs, radio: [{ ...selected }] };

  const survey = [
    {
      question: questions[0],
      answer: Object.values(answerObj.input)[0] || "",
    },
    {
      question: questions[1],
      answer: Object.values(answerObj.input)[1] || "",
    },
    { question: questions[2], answer: answerObj.radio[0] },
  ];

  return (
    // <div className={styles.container}>
    //   <button onClick={() => signInWithGoogle()}>Click Here</button>
    //   <button onClick={() => handleClick()}>sdfsd</button>
    // </div>

    <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll">
      <Screen
        question={
          <div className="text-4xl font-bold">
            <span className="text-2xl text-gray-400">1.</span> What do you like
            the most about the service?
          </div>
        }
        questionField={
          <textarea
            name="textarea1"
            value={inputs?.textarea1 || ""}
            onChange={handleChange}
            className={`bg-gray-50 border-t-orange-100 focus:bg-white rounded-md resize-y min-h-[15rem] min-w-[30rem] border-gray-300 p-4 border focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus:ring-4 focus:ring-purple-200 transition ease-in-out`}
            placeholder="Type your answer here"
          />
        }
      />
      <Screen
        style="border border-t-gray-300 border-b-gray-300"
        question={
          <div className="text-4xl font-bold leading-[3rem] text-center">
            <span className="text-2xl text-gray-400">2.</span> What is your most
            pressing problem for selling <br className="hidden md:block" />{" "}
            products through facebook right now?
          </div>
        }
        questionField={
          <textarea
            // style={{
            //   height: `${textareaHeight}px`,
            // }}
            // onKeyPress={(e) => {
            //   if (e.key === "Enter") {
            //     if (e.shiftKey) {
            //       console.log("shift enter was pressed");

            //       setTextareaHeight(textareaHeight + 20);
            //     }
            //   }
            // }}
            name="textarea2"
            value={inputs?.textarea2 || ""}
            onChange={handleChange}
            className={`rounded-md resize-y bg-gray-50 focus:bg-white border-gray-300 min-h-[15rem] min-w-[30rem] p-4 border focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus:ring-4 focus:ring-purple-200 transition ease-in-out`}
            placeholder="Type your answer here"
          />
        }
      />
      <Screen
        transitionStyle="w-full"
        style="w-full"
        question={
          <div className="text-4xl font-bold text-center text-gray-900">
            <span className="text-2xl text-gray-400">3.</span> How much are you
            willing to pay for the service?
          </div>
        }
        questionField={
          <div className="flex flex-col items-center justify-center">
            <RadioButton selected={selected} setSelected={setSelected} />

            <button
              onClick={async () => {
                const axios = await (await import("axios")).default;

                axios
                  .post("/api/add-survey", {
                    survey,
                  })
                  .then((res) => {
                    console.log("res: ", res);
                    // onSuccess();
                    // toast.success('Successfully added to waitlist')
                  })
                  .catch((err) => {
                    console.log("err: ", err);
                    // onError();
                    // toast.error("Error adding to waitlist");
                  })
                  .finally(() => {
                    setInputs("");
                    setSelected(plans[0]);
                  });
              }}
              className="px-6 py-4 text-white transition-all ease-in-out bg-purple-600 rounded-md mt-9 focus:ring-offset-0 focus:ring-4 focus:ring-purple-200 disabled:bg-purple-200 hover:bg-purple-700 focus:bg-purple-600"
            >
              Submit
            </button>
          </div>
        }
      />
    </div>
  );
}
