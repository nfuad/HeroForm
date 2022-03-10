import { useState } from "react";
import Toggle from "./toggle";

const allToppings = [
  { name: "Golden Corn", checked: false },
  { name: "Paneer", checked: false },
  { name: "Tomato", checked: false },
  { name: "Mushroom", checked: false },
  { name: "Onion", checked: false },
  { name: "Black Olives", checked: false },
];

function Checkbox() {
  const [checkboxes, setCheckboxes] = useState(allToppings);
  console.log("checkboxes: ", checkboxes);

  const handleCheckboxClick = (index) => {
    setCheckboxes(
      checkboxes.map((item, currentIndex) =>
        currentIndex === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div>
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
  );
}

export default Checkbox;
