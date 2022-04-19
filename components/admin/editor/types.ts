export enum QuestionType {
  SHORT_TEXT = 'short-text',
  LONG_TEXT = 'long-text',
  MULTI_CHOICE = 'multi-choice',
}

export type Option = {
  id: string
  value: string
}

export type Question = {
  id: string
  prompt: string
  type: QuestionType
  isRequired: boolean
  options?: Option[]
  placeholder?: string
  properties?: any
}
