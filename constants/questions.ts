export const types = ["checkbox", "radio", "input", "textarea"];

export const testQuestions = [
  {
    id: "1",
    question: "What is your full name name?",
    name: "username",
    type: types[2],
    answer: "",
  },
  {
    id: "2",
    question: "Checkbox about snack foods?",
    type: types[0],
    choices: [
      { name: "Golden Corn", checked: false },
      { name: "Paneer", checked: false },
      { name: "Chocolates", checked: false },
      { name: "Others", checked: false },
    ],
    others: true,
  },
  {
    id: "3",
    question: "Checkbox about meats?",
    type: types[0],
    choices: [
      { name: "BEEF", checked: true },
      { name: "Chicken", checked: false },
      { name: "Beacon", checked: false },
      { name: "Others", checked: false },
    ],
    others: true,
  },

  {
    id: "4",
    question: "What should be the pricing?",
    type: types[1],
    choices: [
      { name: "Basic", checked: true },
      { name: "Pro", checked: false },
      { name: "Custom", checked: false },
    ],
    others: true,
  },
];

export const banglaIndex = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];

export const questions = [
  "এই সার্ভিসের কোন জিনিসটি আপনার সবচেয়ে ভালো লেগেছে?",
  "ফেসবুকের মাদ্ধমে প্রোডাক্ট বিক্রি করার প্রধান সমস্যা কি বলে মনে করেন?",
  "এই সার্ভিসের জন্য আপনি কত পেমেন্ট করতে রাজি আছেন?",
];

export const alphabetIndex = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
