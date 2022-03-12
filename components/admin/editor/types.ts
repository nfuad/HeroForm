export enum QuestionType {
  SHORT_TEXT = 'short-text',
  LONG_TEXT = 'long-text',
  MULTI_SELECT = 'multi-select',
}

export type Question = {
  id: string
  prompt: string
  type: QuestionType
  isRequired: boolean
  options?: string[]
  placeholder?: string
}
