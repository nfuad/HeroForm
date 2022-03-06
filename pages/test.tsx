import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { testQuestions } from "../constants/questions";

function Test() {
  const [state, setState] = useState(testQuestions);

  const handleFormChange = (index, event) => {
    setState((prevState) => {
      prevState[index].answer = event.target.value;
      return [...prevState];
    });
  };

  const handleCheckboxChange = (objectIndex, choiceIndex, choice, event) => {
    setState((prevState) => {
      prevState[objectIndex].choices[choiceIndex].checked = !choice.checked;
      return [...prevState];
    });
  };

  const handleRadioChange = (objectIndex, radioIndex, name) => {
    setState((prevState) => {
      prevState[objectIndex].answer = name;
      return [...prevState];
    });
  };

  return (
    <div>
      {state.map((item, index) => {
        return (
          <div>
            <h1>{item.question}</h1>
            {item.type === "input" && (
              <div>
                <input
                  onChange={(e) => {
                    handleFormChange(index, e);
                  }}
                />
              </div>
            )}
            {item.type === "checkbox" && (
              <div>
                {state[index].choices.map((choice, choiceIndex) => {
                  return (
                    <>
                      <label>{choice.name}</label>
                      <input
                        type="checkbox"
                        checked={choice.checked}
                        onChange={(e) => {
                          handleCheckboxChange(index, choiceIndex, choice, e);
                        }}
                      />
                    </>
                  );
                })}
              </div>
            )}
            {item.type === "radio" && (
              <div>
                <div>
                  {state[index].choices.map((choice, choiceIndex) => {
                    return (
                      <>
                        <RadioGroup
                          value={state[index].answer}
                          onChange={(itemName) => {
                            handleRadioChange(index, choiceIndex, itemName);
                          }}
                        >
                          {/* <RadioGroup.Label>Plan</RadioGroup.Label> */}
                          <RadioGroup.Option value={choice.name}>
                            {({ checked }) => (
                              <span
                                className={
                                  checked ? "text-2xl bg-blue-200" : "text-base"
                                }
                              >
                                {choice.name}
                              </span>
                            )}
                          </RadioGroup.Option>
                        </RadioGroup>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Test;
