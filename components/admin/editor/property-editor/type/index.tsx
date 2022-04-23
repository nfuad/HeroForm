import { FC } from 'react'
import { QuestionType } from '../../types'
import QuestionTypeSelection from './question-type-selection'

type Props = {
  type: QuestionType
  onChange: (type: QuestionType) => void
}

const Type: FC<Props> = ({ type, onChange }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg text-black">Type</h2>
      <QuestionTypeSelection selected={type} onChange={onChange} />
    </div>
  )
}

export default Type
