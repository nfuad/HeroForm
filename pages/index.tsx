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
// import { banglaIndex, questions } from "../constants/questions";
import EditIcon from "../components/EditIcon";
import Chevron from "../components/Chevron";
import { showConfettiAnimation } from "../lib/show-confetti-animation";
import { allToppings } from "../constants/checkbox";
import Checkbox from "../components/checkbox";
import prisma from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";

const questions = {
  [uuidv4()]: {
    prompt: "This is question 1 for you?",
    type: "input",
    options: [],
    answer: "",
    isRequired: true,
  },
  [uuidv4()]: {
    prompt: "This is question 2 for you?",
    type: "input",
    options: [],
    answer: "",
    isRequired: true,
  },
  [uuidv4()]: {
    prompt: "This is question 3 for you?",
    type: "input",
    options: [],
    answer: "",
    isRequired: true,
  },
  [uuidv4()]: {
    prompt: "This is question 4 for you?",
    type: "input",
    options: [],
    answer: "",
    isRequired: true,
  },
  [uuidv4()]: {
    prompt: "This is question 5 for you?",
    type: "input",
    options: [],
    answer: "",
    isRequired: true,
  },
};

const ProgressBar = ({ scrollIndicator }) => (
  <div className="absolute z-50 w-full h-2 bg-gray-200">
    <div
      className="h-2 transition-all duration-1000 ease-in-out bg-gradient-to-r to-gradient-blue-one from-gradient-blue-two"
      style={{ width: `${scrollIndicator}%` }}
    />
  </div>
);

const SubmitButton = ({ handleClick, lastPage }) => {
  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 text-white transition-all ease-in-out rounded-md shadow-3xl bg-gradient-to-r to-gradient-blue-one from-gradient-blue-two focus:ring-offset-0 focus:ring-4"
    >
      {lastPage ? "submit" : "next"}
    </button>
  );
};

const Container = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/background.svg')`,
      }}
      className="relative w-full h-full bg-no-repeat bg-cover"
    >
      {children}
    </div>
  );
};

const DotIndicators = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className="absolute z-50 flex flex-col items-center justify-center space-y-3 right-5 top-1/2 translate-y-[-50%]">
      {Object.keys(questions).map((_, index) => {
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
  );
};

const ArrowNavigator = ({ currentPage, setCurrentPage, totalPages }) => {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages; //total.length - 1;

  return (
    <div className="absolute z-50 flex flex-row border border-gray-400 divide-x-2 divide-gray-300 rounded-lg shadow-md bottom-5 right-5 ">
      <button
        disabled={isFirstPage}
        onClick={() => {
          setCurrentPage((prevState) => prevState - 1);
        }}
        className="p-3 bg-white rounded-l-lg cursor-pointer disabled:bg-gray-200 disabled:cursor-default disabled:hover:text-black hover:bg-gradient-to-r hover:to-gradient-blue-one hover:from-gradient-blue-two hover:text-white"
      >
        <Chevron />
      </button>
      <button
        disabled={isLastPage}
        onClick={() => {
          setCurrentPage((prevState) => prevState + 1);
        }}
        className="p-3 bg-white rounded-r-lg cursor-pointer disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-black disabled:cursor-default hover:bg-gradient-to-r hover:to-gradient-blue-one hover:from-gradient-blue-two hover:text-white"
      >
        <Chevron style="rotate-180" />
      </button>
    </div>
  );
};

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [selected, setSelected] = useState(plans[0]);

  const totalPages = Object.keys(questions).length;
  const lastQuestion = totalPages === currentPage + 1;

  const scrollIndicator = ((currentPage + 1) / totalPages) * 100;

  const [checkboxes, setCheckboxes] = useState(allToppings);

  const handleNext = () => {
    if (lastQuestion) return;
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <Container>
      <ProgressBar scrollIndicator={scrollIndicator} />
      <DotIndicators {...{ totalPages, currentPage, setCurrentPage }} />
      <ArrowNavigator {...{ totalPages, currentPage, setCurrentPage }} />

      <ReactPageScroller
        renderAllPagesOnFirstRender={true}
        onBeforePageScroll={(nextPageIndex) => {
          setCurrentPage(nextPageIndex);
        }}
        transitionTimingFunction="cubic-bezier(0.95, 0.05, 0.08, 1.01)"
        animationTimer={1000}
        blockScrollUp={isSubmitted}
        blockScrollDown={isSubmitted}
        customPageNumber={currentPage}
      >
        {Object.entries(questions).map(([id, question], index) => {
          return (
            <Screen
              key={id}
              index={index}
              question={question}
              handleNext={handleNext}
            />
          );
        })}
      </ReactPageScroller>
    </Container>
  );
}

export async function getStaticProps(context) {
  // const data = await prisma.product.findMany({
  //   include: {
  //     category: true,
  //   },
  // });
  // //convert decimal value to string to pass through as json
  // const products = data.map((product) => ({
  //   ...product,
  //   price: product.price.toString(),
  // }));
  // return {
  //   props: { products },
  // };
  return {
    props: {},
  };
}

/**
 *
 */
