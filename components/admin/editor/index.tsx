import { FC } from 'react'
import QuestionList from './question-list'

const Editor: FC = () => {
  return (
    <div className='flex items-start flex-grow bg-[#FCF1FE] rounded-t-3xl px-6 py-8 gap-x-8'>
      <QuestionList />
    </div>
  )
}

export default Editor
