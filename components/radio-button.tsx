import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

export const plans = [
  {
    name: "বেসিক",
    description: "সবসমই ফ্রি",
  },
  {
    name: "প্রো",
    description: "১000৳ - ৩000৳",
  },
  {
    name: "কাস্টম",
    description: "আপনার বিজনেস অনুযায়ী",
  },
];

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const lastIndex = plans.length - 1;

function MyRadioGroup({ selected, setSelected }) {
  return (
    <div className="w-full">
      <div className="max-w-md mx-auto w-md">
        <RadioGroup
          value={selected}
          onChange={setSelected}
          className="space-y-3"
        >
          {plans.map((plan) => (
            <RadioGroup.Option
              key={plan.name}
              value={plan}
              className={({ active, checked }) =>
                `
                ${
                  active
                    ? "ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60"
                    : ""
                }
                  ${
                    checked
                      ? "bg-gradient-to-r to-gradient-blue-one from-gradient-blue-two shadow-md bg-white border-2 border-blue-800"
                      : "border-2 border-gray-200 bg-white"
                  }
                    relative text-black rounded-xl px-5 py-4 cursor-pointer flex focus:outline-none transition-all ease-in-out`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex items-center space-x-4 justify-start w-full">
                    <div
                      className={`${
                        checked
                          ? "bg-white border-2 border-blue-800"
                          : "border-2 border-gray-500"
                      } w-4 h-4 rounded-full`}
                    />

                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`text-left ${
                            checked
                              ? "font-bold text-white"
                              : "text-gray-900 font-medium "
                          }`}
                        >
                          {plan.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-white" : "text-gray-500"
                          }`}
                        >
                          <span>{plan.description}</span>{" "}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {/* {checked && (
                      <div className="flex-shrink-0 text-white">
                        <CheckIcon className="w-6 h-6" />
                      </div>
                    )} */}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
        {selected.name === plans[lastIndex].name && (
          <div className="space-y-3">Hello</div>
        )}
      </div>
    </div>
  );
}

export default MyRadioGroup;
