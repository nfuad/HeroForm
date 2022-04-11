import { nanoid } from 'nanoid'

import { Option, Question, QuestionType } from './types'

export const createOption = (index): Option => ({
  id: nanoid(),
  value: `option ${index}`,
})

export const createQuestion = ({ order }): any => {
  // switch (type) {
  //   case QuestionType.MULTI_CHOICE:
  //     return {
  //       id: nanoid(),
  //       prompt: '',
  //       isRequired: true,
  //       options: [createOption(), createOption()],
  //       type,
  //     }
  //   default:
  //     return {
  //       id: nanoid(),
  //       prompt: '',
  //       isRequired: true,
  //       placeholder: '',
  //       type,
  //     }
  // }
  return {
    id: nanoid(),
    prompt: getRandomQuestion(),
    type: QuestionType.SHORT_TEXT,
    options: [createOption(1), createOption(2)],
    properties: {
      order,
      isRequired: true,
      placeholder: 'short text',
      isMultipleSelectionAllowed: false,
      isOtherOptionAllowed: false,
      maxCharacters: 0,
    },
  }
}

const getRandomQuestion = () => {
  const questions = [
    "What's your favorite color?",
    'Where do you live?',
    'How old are you?',
    'Why do you like this website?',
    'Do you like this app?',
    "Who's your superhero?",
    "What's your favorite food?",
    'Are you a cat person?',
    "Why don't you like cats?",
    'Tell us about your cat.',
    'Where do you like to eat?',
    "What's your favorite animal?",
  ]

  const randomIndex = Math.floor(Math.random() * questions.length)
  return questions[randomIndex]
}
