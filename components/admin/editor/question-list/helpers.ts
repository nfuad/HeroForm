import { nanoid } from 'nanoid'

import { Question, QuestionType } from '../types'

export const createQuestion = (): Question => ({
  id: nanoid(),
  type: QuestionType.SHORT_TEXT,
  prompt: '',
  placeholder: '',
  isRequired: true,
})
