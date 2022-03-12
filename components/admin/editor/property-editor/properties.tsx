import { ChangeEvent, FC } from 'react'
import { Question } from '../types'

type Props = {
  question: Question
  updateSelectedQuestion: (question: Question) => void
}

const Properties: FC<Props> = ({ question, updateSelectedQuestion }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSelectedQuestion({
      ...question,
      isRequired: e.target.checked,
    })
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg text-black">Properties</h2>
      <div className="space-x-2">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={question.isRequired}
        />
        <span className="font-body">Required</span>
      </div>
    </div>
  )
}

export default Properties
