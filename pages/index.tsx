import ReactPageScroller from "react-page-scroller";
import NextImage from "next/image";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import RadioButton, { plans } from "../components/radio-button";
import Screen from "../components/screen";
import { banglaIndex, questions } from "../constants/questions";
import EditIcon from "../components/EditIcon";
import Chevron from "../components/Chevron";
import { showConfettiAnimation } from "../lib/show-confetti-animation";
import { allToppings } from "../constants/checkbox";
import Checkbox from "../components/checkbox";
import prisma from "../lib/prisma";

// const signInWithGoogle = () => {
//   const provider = new GoogleAuthProvider();
//   provider.addScope("https://www.googleapis.com/auth/spreadsheets");

//   const auth = getAuth();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const idToken = credential.idToken;
//       // The signed-in user info.
//       const user = result.user;
//       console.log({ result, credential, token, user, idToken });
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// };

export default function Home() {
  // const handleClick = () => {
  //   const auth = getAuth();
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // User is signed in.
  //       console.log("user", user);
  //       axios
  //         .post("/api/hello", {
  //           idToken: "",
  //         })
  //         .then((res) => console.log("res", res))
  //         .catch((err) => console.error("err", err));
  //     } else {
  //       // No user is signed in.
  //       console.log("No user is signed in.");
  //     }
  //   });
  // };

  // const [textareaHeight, setTextareaHeight] = useState(100);
  const [inputs, setInputs] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(0);
  console.log("currentPage: ", currentPage);

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
    setIsSubmitted(true);
    axios
      .post("/api/add-survey", {
        survey,
      })
      .then((res) => {
        console.log("res: ", res);
        setCurrentPage((prevState) => prevState + 1);
        showConfettiAnimation();

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

  const [isSubmitted, setIsSubmitted] = useState(false);

  const SubmitButton = () => {
    return (
      <button
        onClick={lastPage ? handleSubmitSurvey : handlePageChange}
        className="px-6 py-3 text-white transition-all ease-in-out rounded-md shadow-3xl bg-gradient-to-r to-gradient-blue-one from-gradient-blue-two focus:ring-offset-0 focus:ring-4"
      >
        {lastPage ? "সাবমিট" : "নেক্সট"}
      </button>
    );
  };

  const lastPage = questions.length === currentPage;

  const totalPages = questions.length + 1;

  const totalPagesToArray = Array.from({ length: totalPages }, (_, i) => i);
  console.log("totalPagesToArray: ", totalPagesToArray);

  const scrollIndicator = isSubmitted
    ? 100
    : (100 / questions.length) * currentPage;

  const [checkboxes, setCheckboxes] = useState(allToppings);

  return (
    // <div className={styles.container}>
    //   <button onClick={() => signInWithGoogle()}>Click Here</button>
    //   <button onClick={() => handleClick()}>sdfsd</button>
    // </div>

    <div
      style={{
        backgroundImage: `url('/background.svg')`,
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="relative"
    >
      <div className="absolute z-50 w-full h-2 bg-gray-200">
        <div
          className="h-2 transition-all duration-1000 ease-in-out bg-gradient-to-r to-gradient-blue-one from-gradient-blue-two"
          style={{ width: `${scrollIndicator}%` }}
        />
      </div>

      {!isSubmitted && (
        <>
          <div className="absolute z-50 flex flex-col items-center justify-center space-y-3 right-5 top-1/2 translate-y-[-50%]">
            {totalPagesToArray.map((i, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentPage(index);
                  }}
                  className={`transition-all duration-300 ease-in-out cursor-pointer ${
                    index === currentPage
                      ? "bg-gradient-blue-one w-4 h-4"
                      : "bg-gray-200 w-2 h-2"
                  } rounded-full`}
                />
              );
            })}
          </div>
          <div className="absolute z-50 flex flex-row border border-gray-400 divide-x-2 divide-gray-300 rounded-lg shadow-md bottom-5 right-5 ">
            <button
              disabled={currentPage === 0}
              onClick={() => {
                setCurrentPage((prevState) => prevState - 1);
              }}
              className="p-3 bg-white rounded-l-lg cursor-pointer disabled:bg-gray-200 disabled:cursor-default disabled:hover:text-black hover:bg-gradient-to-r hover:to-gradient-blue-one hover:from-gradient-blue-two hover:text-white"
            >
              <Chevron />
            </button>
            <button
              disabled={lastPage}
              onClick={() => {
                setCurrentPage((prevState) => prevState + 1);
              }}
              className="p-3 bg-white rounded-r-lg cursor-pointer disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-black disabled:cursor-default hover:bg-gradient-to-r hover:to-gradient-blue-one hover:from-gradient-blue-two hover:text-white"
            >
              <Chevron style="rotate-180" />
            </button>
          </div>
        </>
      )}

      <ReactPageScroller
        containerHeight="100vh"
        // containerWidth={window.innerWidth}
        renderAllPagesOnFirstRender={true}
        onBeforePageScroll={(nextPageIndex) => {
          setCurrentPage(nextPageIndex);
        }}
        pageOnChange={(page) => setCurrentPage(page)}
        transitionTimingFunction="cubic-bezier(0.95, 0.05, 0.08, 1.01)"
        animationTimer={1000}
        blockScrollUp={isSubmitted}
        blockScrollDown={isSubmitted}
        customPageNumber={currentPage}
      >
        {/* <Screen
          transitionStyle="w-full flex justify-center items-center"
          submitButton={<SubmitButton />}
          question={
            <div className="">
              <span className="text-2xl text-gray-400">{banglaIndex[0]}.</span>{" "}
              <span>{questions[0]}</span>
            </div>
          }
          questionField={
            <>
              <textarea
                name="textarea1"
                value={inputs?.textarea1 || ""}
                onChange={handleChange}
                className={`bg-gray-50 focus:bg-white rounded-md resize-y min-w-[91%] min-h-[15rem] md:min-w-[30rem] border-gray-300 p-4 border focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus:ring-4 focus:ring-purple-200 transition ease-in-out`}
                placeholder="Type your answer here"
              />
            </>
          }
        /> */}

        <Screen
          transitionStyle="w-full flex justify-center items-center"
          submitButton={<SubmitButton />}
          question={
            <div className="">
              {/* <span className="text-2xl text-gray-400">{banglaIndex[0]}.</span>{" "} */}
              <span>{questions[0]}</span>
            </div>
          }
          questionField={
            <>
              <Checkbox checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
            </>
          }
        />

        {/* <Screen
          transitionStyle="w-full flex justify-center items-center"
          submitButton={<SubmitButton />}
          question={
            <div className="text-center">
              <span className="text-2xl text-gray-400">{banglaIndex[1]}.</span>
              <span>{questions[1]}</span>
            </div>
          }
          questionField={
            <textarea
              name="textarea2"
              value={inputs?.textarea2 || ""}
              onChange={handleChange}
              className={`rounded-md resize-y bg-gray-50 focus:bg-white border-gray-300 min-w-[91%] min-h-[15rem] md:min-w-[30rem] p-4 border focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus:ring-4 focus:ring-purple-200 transition ease-in-out`}
              placeholder="Type your answer here"
            />
          }
        /> */}
        <Screen
          transitionStyle="w-full flex justify-center items-center"
          submitButton={<SubmitButton />}
          question={
            <div className="text-center">
              {/* <span className="text-2xl text-gray-400">{banglaIndex[1]}.</span> */}
              <span>{questions[1]}</span>
            </div>
          }
          questionField={
            <>
              <Checkbox checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
            </>
          }
        />

        <Screen
          submitButton={<SubmitButton />}
          transitionStyle="w-full"
          style="w-full"
          question={
            <div className="text-center text-gray-900 ">
              {/* <span className="text-2xl text-gray-400">{banglaIndex[2]}.</span> */}
              <span>{questions[2]}</span>
            </div>
          }
          questionField={
            <div className="flex flex-col items-center justify-center">
              <RadioButton selected={selected} setSelected={setSelected} />
            </div>
          }
        />

        <Screen
          transitionStyle="w-full flex justify-center items-center"
          question={<div className="text-center text-gray-900">Summary</div>}
          questionField={
            <div className="flex flex-col items-start w-[91%] md:w-[592px] justify-center bg-white border border-gray-300 divide-y rounded-lg shadow-md p-7">
              {survey.map((item, index) => {
                const even = index % 2 !== 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-row justify-center align-center space-x-2 p-5`}
                  >
                    <div>
                      <div className="relative flex space-x-1 text-base sm:text-lg md:text-xl">
                        {/* <span className="font-extralight">Q:</span>{" "} */}
                        <p className="font-semibold">{item.question}</p>{" "}
                      </div>
                      <div className="flex mt-2 space-x-1 text-sm sm:text-base md:text-lg">
                        {/* <span className="font-extralight">A:</span>{" "} */}
                        <p className="font-semibold text-gray-500">
                          {item.answer}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setCurrentPage(index);
                      }}
                      className="text-gray-400 transition-all ease-in-out cursor-pointer hover:text-black"
                    >
                      <EditIcon />
                    </div>
                  </div>
                );
              })}
            </div>
          }
          submitButton={<SubmitButton />}
        />
        {isSubmitted && (
          <Screen
            question={
              <div className="space-y-6">
                <div className="text-6xl text-center">🎉</div>
                <div className="text-center text-gray-900">
                  Thank you for your time!
                </div>
              </div>
            }
            questionField={
              <div className="flex flex-col items-start justify-center border border-gray-300 divide-y rounded-lg shadow-md p-7">
                Your answer has been submitted! You can safely close this window
                now.
              </div>
            }
            // submitButton={<SubmitButton />}
          />
        )}
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

export async function getStaticProps(context) {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  //convert decimal value to string to pass through as json
  const products = data.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));
  return {
    props: { products },
  };
}
