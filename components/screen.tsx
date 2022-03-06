import { Transition } from "@headlessui/react";
import { useRef } from "react";
import useIntersectionObserver from "../hooks/use-intersection-observer";

function Screen({
  question,
  questionField,
  style,
  transitionStyle,
  submitButton,
}: any) {
  const ref = useRef();
  const entryScreen1 = useIntersectionObserver(ref, {});
  const isVisible = !!entryScreen1?.isIntersecting;

  return (
    <div
      ref={ref}
      // overflow="auto"
      // py-6
      className={`flex flex-col w-full px-4 md:px-0 h-full items-center justify-center space-y-12 align-center ${style}`}
    >
      <Transition
        show={isVisible}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0"
      >
        <div className=" lg:leading-[3.5rem] text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-4xl ">
          {question}
        </div>
      </Transition>

      <Transition
        className={`${transitionStyle}`}
        show={isVisible}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-[0.9] translate-y-12"
        enterTo="opacity-100 rotate-0 scale-100 translate-y-0"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 translate-y-6"
      >
        {questionField}
      </Transition>

      <Transition
        show={isVisible}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0"
      >
        {submitButton}
      </Transition>
    </div>
  );
}

export default Screen;
