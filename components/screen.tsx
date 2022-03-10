import { Transition } from "@headlessui/react";
import { useRef } from "react";
import useIntersectionObserver from "../hooks/use-intersection-observer";

function Screen({ question, questionField, style, transitionStyle }: any) {
  const ref = useRef();
  const entryScreen1 = useIntersectionObserver(ref, {});
  const isVisible = !!entryScreen1?.isIntersecting;

  return (
    <div
      ref={ref}
      className={`flex flex-col w-full items-center justify-center h-screen space-y-12 align-center ${style}`}
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
        <div className="text-4xl font-bold leading-[3rem] text-center">
          {question}
        </div>
      </Transition>

      <Transition
        className={`${transitionStyle}`}
        show={isVisible}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-[0.8] translate-y-12"
        enterTo="opacity-100 rotate-0 scale-100 translate-y-0"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 translate-y-6"
      >
        {questionField}
      </Transition>
    </div>
  );
}

export default Screen;
