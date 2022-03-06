import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { testQuestions } from "../constants/questions";

function Test() {
  const [state, setState] = useState(testQuestions);
  console.log("state: ", state);

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
  const handleRadioChange = (objectIndex, radioIndex, choice, event) => {
    setState((prevState) => {
      prevState[objectIndex].choices[radioIndex].checked = !choice.checked;
      return prevState;
    });
  };

  return (
    <div>
      <div
        onClick={() => {
          console.log(state);
        }}
      >
        hello
      </div>

      {state.map((item, index) => {
        return (
          <div>
            <h1>{item.question}</h1>
            {item.type === "input" && (
              <div>
                {/* {console.log(index)} */}

                <input
                  onChange={(e) => {
                    // console.log(" state[0].answer: ", state[0].answer);
                    // console.log(state);

                    handleFormChange(index, e);
                  }}
                />
              </div>
            )}
            {item.type === "checkbox" && (
              <div>
                {console.log("checkbox", index)}
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
                {console.log("radio", index)}
                <div>
                  {state[index].choices.map((choice, choiceIndex) => {
                    return (
                      <>
                        {/* <label>{choice.name}</label> */}
                        {/* <input
                          type="radio"
                          checked={choice.checked}
                          onChange={(e) => {
                            console.log(state);
                            handleRadioChange(index, choiceIndex, choice, e);
                          }}
                        /> */}

                        <RadioGroup
                          value={state[index].choices}
                          onChange={(item) => {
                            console.log(item);
                          }}
                        >
                          <RadioGroup.Label>Plan</RadioGroup.Label>
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
