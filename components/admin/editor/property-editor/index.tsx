import { FC } from 'react'
import Properties from './properties'
import QuestionType from './question-type'

const PropertyEditor: FC = () => {
  return (
    <div className="w-full max-w-xs px-6 py-8 space-y-8 bg-white rounded-2xl">
      <QuestionType />
      <Properties />
    </div>
  )
}

export default PropertyEditor
