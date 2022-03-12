import { FC } from 'react'
import { Question } from '../types'
import Container from './container'
import QuestionPrompt from './question-prompt'

type Props = {
  question: Question
  updateSelectedQuestion: (newQuestion: Question) => void
}

const QuestionEditor: FC<Props> = ({ question, updateSelectedQuestion }) => {
  const handlePromptChange = (prompt: string) => {
    updateSelectedQuestion({ ...question, prompt })
  }

  return (
    <Container>
      {question && (
        <>
          <QuestionPrompt
            prompt={question.prompt}
            onChange={handlePromptChange}
          />
        </>
      )}
    </Container>
  )
}

export default QuestionEditor
