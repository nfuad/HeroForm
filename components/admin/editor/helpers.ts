import { nanoid } from 'nanoid'

import { Option, Question, QuestionType } from './types'

export const createOption = (): Option => ({
  id: nanoid(),
  value: 'Option',
})

export const createQuestion = (type: QuestionType): Question => {
  switch (type) {
    case QuestionType.MULTI_CHOICE:
      return {
        id: nanoid(),
        prompt: '',
        isRequired: true,
        options: [createOption(), createOption()],
        type,
      }
    default:
      return {
        id: nanoid(),
        prompt: '',
        isRequired: true,
        placeholder: '',
        type,
      }
  }
}
