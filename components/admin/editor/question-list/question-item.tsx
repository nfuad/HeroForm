import { FC, MouseEventHandler } from 'react'
import { Question } from '../types'

type Props = {
  question: Question
  onClick: MouseEventHandler<HTMLButtonElement>
  selected?: boolean
}

const QuestionItem: FC<Props> = ({ question, onClick, selected = false }) => {
  return (
    <button
      className={`flex items-center w-full gap-x-4 px-3 py-2 rounded-lg text-left transition focus:ring-2 focus:ring-blue-200 ${
        selected ? 'bg-blue-100' : 'hover:bg-blue-50'
      }`}
      onClick={onClick}
      type="button"
    >
      <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md" />
      <p
        className={`flex-grow text-base text-gray-800 font-body line-clamp-2 ${
          selected && 'font-semibold'
        }`}
      >
        {question.prompt || 'Untitled Question'}
      </p>
    </button>
  )
}

export default QuestionItem
