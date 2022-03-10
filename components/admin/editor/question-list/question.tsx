import { FC } from 'react'

type Props = {
  selected?: boolean
}

const Question: FC<Props> = ({ selected = false }) => {
  return (
    <button
      className={`flex items-center gap-x-4 px-3 py-2 rounded-lg text-left transition focus:ring-2 focus:ring-blue-200 ${
        selected ? 'bg-blue-100' : 'hover:bg-blue-50'
      }`}
      type="button"
    >
      <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md" />
      <p
        className={`flex-grow text-base text-gray-800 font-body line-clamp-2 ${
          selected && 'font-semibold'
        }`}
      >
        This is an amazing question that will blow your mind
      </p>
    </button>
  )
}

export default Question
