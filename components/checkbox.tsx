import { Transition } from "@headlessui/react";
import Toggle from "./toggle";

function Checkbox({ checkboxes, setCheckboxes, inputs, handleChange }: any) {
  const handleCheckboxClick = (index) => {
    setCheckboxes(
      checkboxes.map((item, currentIndex) =>
        currentIndex === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const lastIndex = checkboxes.length - 1;

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-5 ease-in-out transition-height">
      <div className="space-y-3 flex flex-col">
        {checkboxes.map((item, index) => {
          return (
            <Toggle
              key={item.name}
              label={item.name}
              isChecked={item.checked}
              index={index}
              onChangeHandler={() => handleCheckboxClick(index)}
            />
          );
        })}
      </div>
      <Transition
        show={checkboxes[lastIndex].checked === true}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0"
      >
        <input
          name="textarea1"
          value={inputs?.textarea1 || ""}
          onChange={handleChange}
          className={`bg-white rounded-xl resize-y w-96 border-gray-300 p-4 border focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus:ring-4 focus:ring-blue-200 transition ease-in-out`}
          placeholder="Type your option here"
        />
      </Transition>
    </div>
  );
}

export default Checkbox;
