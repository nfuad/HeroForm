import { Question } from '@components/admin/editor/types'
import { FC, useState } from 'react'

type Props = {
  question: Question
}

const MultiChoice: FC<Props> = ({ question }) => {
  const [selected, setSelected] = useState('')

  const renderOptions = () => {
    return question.options.map((option) => {
      const isSelected = selected === option.id
      const handleClick = () => setSelected(option.id)

      return (
        <button key={option.id} onClick={handleClick} type="button">
          {option.value} {isSelected ? '(selected like a pro)' : ''}
        </button>
      )
    })
  }

  return (
    <div>
      <div className="text-center">I am not designed :'(</div>
      <div className="flex flex-col mt-8 space-y-1">{renderOptions()}</div>
    </div>
  )
}

export default MultiChoice
