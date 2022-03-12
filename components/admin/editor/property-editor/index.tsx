import { FC } from 'react'
import { Question, QuestionType } from '../types'
import Properties from './properties'
import Type from './type'

type Props = {
  question: Question | null
  updateSelectedQuestion: (question: Question) => void
}

const PropertyEditor: FC<Props> = ({ question, updateSelectedQuestion }) => {
  const handleTypeUpdate = (type: QuestionType) => {
    updateSelectedQuestion({
      ...question,
      type,
    })
  }

  return (
    <div className="w-full max-w-xs px-6 py-8 space-y-8 bg-white rounded-2xl shadow-spread">
      {question && (
        <>
          <Type type={question.type} onChange={handleTypeUpdate} />
          <Properties
            question={question}
            updateSelectedQuestion={updateSelectedQuestion}
          />
        </>
      )}
    </div>
  )
}

export default PropertyEditor
