import { FC } from 'react'
import Button from '../../../button'
import Question from './question'

const QuestionList: FC = () => {
  const renderQuestions = () => {
    return (
      <>
        <Question />
        <Question selected />
      </>
    )
  }

  return (
    <div className="flex flex-col w-full max-w-xs px-3 py-8 bg-white rounded-2xl shadow-spread">
      <div className="flex items-center justify-between w-full px-3">
        <h2 className="text-lg">Questions</h2>
        <Button padding="p-2" borderRadius="rounded-md">
          <svg
            className="w-2.5 h-2.5 fill-current text-white"
            viewBox="0 0 1000 1000"
          >
            <path d="M905.3,407.7H584.1l0.6-310.3c0-0.3-0.1-0.4-0.1-0.7v-4.9h-0.5c-3.3-43.8-40.4-78.8-84.9-79.1c-44.5-0.3-81.1,34.1-83.8,77.9h-0.6l0.1,317H93.5C47.1,407.3,9.7,445.5,10,492c0.3,46.5,38.2,84.4,84.7,84.7l320.1-0.3l0.1,326.2c0.3,46.5,38.2,84.4,84.7,84.7c46.5,0.3,83.8-37.1,83.5-83.5l0.6-327.5l322.8-0.3c46.5,0.3,83.8-37.1,83.5-83.6C989.7,445.9,951.8,408,905.3,407.7z" />
          </svg>
        </Button>
      </div>
      <div className="mt-6 space-y-2">{renderQuestions()}</div>
    </div>
  )
}

export default QuestionList
