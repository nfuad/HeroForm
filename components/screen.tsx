import { Transition } from "@headlessui/react";
import { Children, useRef } from "react";
import useIntersectionObserver from "../hooks/use-intersection-observer";

const TransitionWrapper = ({
  isVisible,
  children,
  enterFrom,
  enterTo,
  leaveTo,
}: any) => {
  return (
    <Transition
      className={"w-full flex justify-center items-center"}
      show={isVisible}
      enter="transform transition duration-[400ms]"
      enterFrom={enterFrom || "opacity-0"}
      enterTo={enterTo || "opacity-100 translate-y-0"}
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 scale-100 translate-y-0"
      leaveTo={leaveTo || "opacity-0"}
    >
      {children}
    </Transition>
  );
};

function Screen({ question, index, handleNext }: any) {
  const ref = useRef();
  const entryScreen1 = useIntersectionObserver(ref, {});
  const isVisible = !!entryScreen1?.isIntersecting;
  const questionNumber = index + 1;

  return (
    <div
      ref={ref}
      className="flex flex-col w-full h-full mx-auto items-center justify-center max-w-4xl text-center gap-y-16"
    >
      <TransitionWrapper isVisible={isVisible}>
        <h1 className="text-lg sm:text-xl md:text-3xl lg:text-6xl">
          {question.prompt}
        </h1>
      </TransitionWrapper>

      <TransitionWrapper
        isVisible={isVisible}
        enterFrom="opacity-0 scale-[0.9] translate-y-12"
        enterTo="opacity-100 rotate-0 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 translate-y-6"
      >
        <input
          className="w-full max-w-3xl text-2xl px-7 py-7 font-heading rounded-3xl placeholder:text-gray-300 placeholder:font-body"
          placeholder="andrew@pepek.com"
          type="text"
          style={{
            boxShadow: "0px 14px 39px 10px rgba(235, 145, 145, 0.2)",
          }}
        />
      </TransitionWrapper>

      <TransitionWrapper isVisible={isVisible}>
        <button
          className="flex items-center justify-center py-4 space-x-2 text-white bg-black shadow-3xl px-7 font-heading rounded-xl"
          onClick={handleNext}
        >
          <span className="tracking-wider">Continue</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </TransitionWrapper>
    </div>
  );
}

export default Screen;
