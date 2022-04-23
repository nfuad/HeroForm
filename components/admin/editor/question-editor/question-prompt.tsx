import { FC } from 'react'
import Editable from './editable'

type Props = {
  prompt: string
  onChange: (prompt: string) => void
}

const QuestionPrompt: FC<Props> = ({ prompt, onChange }) => {
  return (
    <Editable
      className="flex-shrink-0 w-full text-4xl text-center text-gray-700 placeholder-gray-300 font-heading"
      placeholder="Enter Question..."
      value={prompt}
      onChange={onChange}
    />
  )
}

export default QuestionPrompt
