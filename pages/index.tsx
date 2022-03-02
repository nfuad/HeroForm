import ReactPageScroller from "react-page-scroller";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import RadioButton, { plans } from "../components/radio-button";
import Screen from "../components/screen";
import { questions } from "../constants/questions";
import EditIcon from "../components/EditIcon";
import Chevron from "../components/Chevron";

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
  const [currentPage, setCurrentPage] = useState(0);

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
      answer: Object.values(answerObj.input)[0] || "Type your answer one here",
    },
    {
      question: questions[1],
      answer: Object.values(answerObj.input)[1] || "Type your answer two here",
    },
    { question: questions[2], answer: answerObj.radio[0].name },
  ];

  const handlePageChange = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const handleSubmitSurvey = () => {
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
  };

  const lastPage = questions.length === currentPage;
  console.log("questions.length: ", questions.length);

  const SubmitButton = () => {
    return (
      <button
        onClick={lastPage ? handleSubmitSurvey : handlePageChange}
        className="px-6 py-4 text-white transition-all ease-in-out bg-purple-600 rounded-md mt-9 focus:ring-offset-0 focus:ring-4 focus:ring-purple-200 disabled:bg-purple-200 hover:bg-purple-700 focus:bg-purple-600"
      >
        {lastPage ? "Submit" : "Next"}
      </button>
    );
  };

  const totalPages = questions.length + 1;
  const totalPagesToArray = Array.from({ length: totalPages }, (_, i) => i);
  console.log("totalPagesToArray: ", totalPagesToArray);

  return (
    // <div className={styles.container}>
    //   <button onClick={() => signInWithGoogle()}>Click Here</button>
    //   <button onClick={() => handleClick()}>sdfsd</button>
    // </div>

    <div className="relative">
      <div className="absolute z-50 w-full h-2 bg-gray-200">
        <div
          className="h-2 transition-all ease-in-out bg-purple-700"
          style={{ width: `${(100 / questions.length) * currentPage}%` }}
        />
      </div>
      <div className="absolute z-50 flex flex-row border border-gray-400 divide-x-2 divide-gray-300 rounded-lg shadow-md bottom-5 right-5 ">
        <button
          disabled={currentPage === 0}
          onClick={() => {
            setCurrentPage((prevState) => prevState - 1);
          }}
          className="p-3 bg-white disabled:bg-gray-200 disabled:cursor-default disabled:hover:text-black rounded-l-lg cursor-pointer hover:bg-purple-700 hover:text-white"
        >
          <Chevron />
        </button>
        <button
          disabled={lastPage}
          onClick={() => {
            setCurrentPage((prevState) => prevState + 1);
          }}
          className="p-3 bg-white rounded-r-lg disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-black disabled:cursor-default cursor-pointer hover:bg-purple-700 hover:text-white"
        >
          <Chevron style="rotate-180" />
        </button>
      </div>

      <div
        style={{ transform: "translateY(-50%)" }}
        className="absolute z-50 flex flex-col items-center justify-center space-y-3 right-5 top-1/2"
      >
        {totalPagesToArray.map((i, index) => {
          return (
            <div
              onClick={() => {
                setCurrentPage(index);
              }}
              className={`transition-all ease-in-out cursor-pointer ${
                index === currentPage
                  ? "bg-purple-700 w-4 h-4"
                  : "bg-gray-200 w-2 h-2"
              }  rounded-full`}
            />
          );
        })}
      </div>

      <ReactPageScroller
        pageOnChange={(page) => setCurrentPage(page)}
        transitionTimingFunction="cubic-bezier(0.95, 0.05, 0.08, 1.01)"
        animationTimer={1000}
        customPageNumber={currentPage}
      >
        <Screen
          submitButton={<SubmitButton />}
          question={
            <div className="text-4xl font-bold">
              <span className="text-2xl text-gray-400">1.</span> What do you
              like the most about the service?
            </div>
          }
          questionField={
            <>
              <textarea
                name="textarea1"
                value={inputs?.textarea1 || ""}
                onChange={handleChange}
                className={`bg-gray-50 focus:bg-white rounded-md resize-y min-h-[15rem] min-w-[30rem] border-gray-300 p-4 border focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus:ring-4 focus:ring-purple-200 transition ease-in-out`}
                placeholder="Type your answer here"
              />
            </>
          }
        />

        <Screen
          submitButton={<SubmitButton />}
          question={
            <div className="text-4xl font-bold leading-[3rem] text-center">
              <span className="text-2xl text-gray-400">2.</span> What is your
              most pressing problem for selling{" "}
              <br className="hidden md:block" /> products through facebook right
              now?
            </div>
          }
          questionField={
            <textarea
              name="textarea2"
              value={inputs?.textarea2 || ""}
              onChange={handleChange}
              className={`rounded-md resize-y bg-gray-50 focus:bg-white border-gray-300 min-h-[15rem] min-w-[30rem] p-4 border focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus:ring-4 focus:ring-purple-200 transition ease-in-out`}
              placeholder="Type your answer here"
            />
          }
        />

        <Screen
          submitButton={<SubmitButton />}
          transitionStyle="w-full"
          style="w-full"
          question={
            <div className="text-4xl font-bold text-center text-gray-900">
              <span className="text-2xl text-gray-400">3.</span> How much are
              you willing to pay for the service?
            </div>
          }
          questionField={
            <div className="flex flex-col items-center justify-center">
              <RadioButton selected={selected} setSelected={setSelected} />
            </div>
          }
        />

        <Screen
          question={
            <div className="text-4xl font-bold text-center text-gray-900">
              Summary
            </div>
          }
          questionField={
            <div className="flex flex-col items-start justify-center border border-gray-300 divide-y rounded-lg shadow-md p-7">
              {survey.map((item, index) => {
                const even = index % 2 !== 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-col justify-center w-[592px] align-center p-5`}
                  >
                    <div className="relative flex space-x-1 text-xl">
                      {/* <span className="font-extralight">Q:</span>{" "} */}
                      <p className="font-semibold">{item.question}</p>{" "}
                      <div
                        onClick={() => {
                          setCurrentPage(index);
                        }}
                        className="absolute top-0 right-0 text-gray-400 transition-all ease-in-out cursor-pointer hover:text-black"
                      >
                        <EditIcon />
                      </div>
                    </div>
                    <div className="flex space-x-1 text-lg mt-2">
                      {/* <span className="font-extralight">A:</span>{" "} */}
                      <p className="font-semibold text-gray-500">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          }
          submitButton={<SubmitButton />}
        />
      </ReactPageScroller>
    </div>
  );
}

// #Todo: Change height on shift enter

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
