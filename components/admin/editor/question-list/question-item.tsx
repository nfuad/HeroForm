import { FC, MouseEventHandler } from 'react'
import { Question } from '../types'

type Props = {
  question: Question
  onClick: MouseEventHandler<HTMLButtonElement>
  selected?: boolean
  order: number
}

const QuestionItem: FC<Props> = ({
  question,
  onClick,
  selected = false,
  order = 1,
}) => {
  console.log({ question })
  return (
    <button
      className={`flex items-center w-full gap-x-4 px-3 py-2 rounded-lg text-left transition-all ${
        selected ? 'bg-violet-200' : 'hover:bg-violet-50'
      }`}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md">
        <p className="text-xs">{order}</p>
      </div>
      <p
        className={`flex-grow text-sm text-gray-800 line-clamp-2 ${
          selected ? 'font-semibold' : 'font-body'
        }`}
      >
        {question?.prompt}
      </p>
    </button>
  )
}

export default QuestionItem
