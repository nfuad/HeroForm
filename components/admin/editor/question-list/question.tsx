import { FC } from 'react'

type Props = {
  selected?: boolean
}

const Question: FC<Props> = ({ selected = false }) => {
  return (
    <div
      className={`flex items-center gap-x-2 px-3 py-2 rounded-lg ${
        selected && 'bg-blue-100'
      }`}
    >
      <div className='flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md' />
      <p className='flex-grow text-sm text-black truncate font-body'>
        This is an amazing question that will blow your mind
      </p>
    </div>
  )
}

export default Question
