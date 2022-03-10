import { FC } from 'react'
import QuestionTypeSelection from './question-type-selection'

const QuestionType: FC = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg text-black">Type</h2>
      <QuestionTypeSelection selected="short-text" />
    </div>
  )
}

export default QuestionType
