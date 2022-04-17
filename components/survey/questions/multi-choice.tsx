import { Question } from '@components/admin/editor/types'
import { FC } from 'react'

type Props = {
  properties: any
  question: Question
  selected: string
  setSelected: (value: string) => void
}

const MultiChoice: FC<Props> = ({
  question,
  selected,
  setSelected,
  properties,
}) => {
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
