import { FC } from 'react'
import { Option, Question, QuestionType } from '../types'
import Options from './options'
import Container from './container'
import QuestionPrompt from './question-prompt'

type Props = {
  question: Question
  updateSelectedQuestion: (newQuestion: Question) => void
}

const QuestionEditor: FC<Props> = ({ question, updateSelectedQuestion }) => {
  const isShortText = question?.type === QuestionType.SHORT_TEXT
  const isLongText = question?.type === QuestionType.LONG_TEXT
  const isMultiChoice = question?.type === QuestionType.MULTI_CHOICE

  const setPrompt = (prompt: string) => {
    updateSelectedQuestion({ ...question, prompt })
  }

  const setOptions = (options: Option[]) => {
    updateSelectedQuestion({ ...question, options })
  }

  return (
    <Container>
      {question && (
        <>
          <QuestionPrompt prompt={question.prompt} onChange={setPrompt} />
          {isShortText && (
            <input
              className="flex-shrink-0 w-full max-w-3xl mx-auto mt-8 text-2xl px-7 py-7 font-heading rounded-3xl placeholder:text-gray-300 placeholder:font-body"
              placeholder={question.placeholder}
              type="text"
              style={{
                boxShadow: '0px 14px 39px 10px rgba(235, 145, 145, 0.2)',
              }}
              disabled
            />
          )}
          {isLongText && (
            <textarea
              className="flex-shrink-0 w-full max-w-3xl mx-auto mt-8 text-2xl resize-none px-7 py-7 font-heading rounded-3xl placeholder:text-gray-300 placeholder:font-body"
              placeholder={question.placeholder}
              style={{
                boxShadow: '0px 14px 39px 10px rgba(235, 145, 145, 0.2)',
              }}
              rows={5}
              disabled
            />
          )}
          {isMultiChoice && (
            <Options options={question.options} setOptions={setOptions} />
          )}
        </>
      )}
    </Container>
  )
}

export default QuestionEditor
