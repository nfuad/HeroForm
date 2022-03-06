import { useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import { alphabetIndex } from "../constants/questions";

function Toggle({ label, index, onChangeHandler, isChecked }: any) {
  return (
    <Switch
      tabIndex={index}
      checked={isChecked}
      onChange={onChangeHandler}
      className={`${
        isChecked
          ? "border-blue-800 border-2 text-white bg-gradient-to-r to-gradient-blue-one from-gradient-blue-two font-bold"
          : "border-2 border-black"
      } relative flex flex-row justify-center bg-white items-center space-x-4 rounded-xl py-4 px-4 w-96 transition-all ease-in-out duration-200`}
    >
      {/* <span className="sr-only">Use setting</span> */}
      <span
        className={`${
          isChecked
            ? "font-bold bg-white text-black border-2 border-blue-800"
            : "border-black border-2"
        } flex items-center justify-center font-semibold rounded-lg py-1 px-2`}
      >
        {alphabetIndex[index].toUpperCase()}
      </span>
      <span className={`${isChecked ? "" : ""} text-left w-full`}>
        {label || "hello"}
      </span>
    </Switch>
  );
}

export default Toggle;

// outline outline-offset-2 outline-4 outline-cyan-500
