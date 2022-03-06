import { useState } from "react";
import { Switch } from "@headlessui/react";

function Toggle({ label, index, onChangeHandler, isChecked }: any) {
  return (
    <Switch
      tabIndex={index}
      checked={isChecked}
      onChange={onChangeHandler}
      className={`${
        isChecked
          ? "bg-cyan-700 text-white border border-cyan-300"
          : "bg-gray-200 border-2 border-gray-300"
      } relative inline-flex items-center h-36 rounded-md w-48 transition-all ease-in-out duration-200`}
    >
      {/* <span className="sr-only">Use setting</span> */}
      <span className={`${isChecked ? "" : ""} text-center w-full`}>
        {label || "hello"}
      </span>
    </Switch>
  );
}

export default Toggle;

// outline outline-offset-2 outline-4 outline-cyan-500
