import { FC, useState } from 'react'
import { DropdownIcon } from '@components/icons'
import { QuestionType } from '@components/admin/editor/types'

type Props = {
  className?: string
  selected: QuestionType
  onChange: (type: QuestionType) => void
}

const options = [
  {
    id: QuestionType.SHORT_TEXT,
    label: 'Short Text',
  },
  {
    id: QuestionType.LONG_TEXT,
    label: 'Long Text',
  },
  {
    id: QuestionType.MULTI_CHOICE,
    label: 'Multi Select',
  },
]

const QuestionTypeSelection: FC<Props> = ({
  className = '',
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false)
  const selectedLabel = options.find(({ id }) => id === selected)?.label

  const handleClick = () => setOpen((prevState) => !prevState)

  const renderOptions = () => {
    return options.map(({ label, id }) => {
      const isSelected = selected === id
      const handleSelect = () => {
        onChange(id)
        setOpen(false)
      }

      return (
        <button
          key={`question-type-${label}`}
          className={`flex items-center gap-x-2 w-full px-2 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-200 transition ${
            isSelected ? 'bg-blue-100' : 'hover:bg-blue-50'
          }`}
          type="button"
          onClick={handleSelect}
        >
          <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md" />
          <span className="flex-grow font-medium text-left text-gray-800 font-body">
            {label}
          </span>
        </button>
      )
    })
  }

  return (
    <div className={`relative min-h-[42px] ${className}`}>
      <button
        className="flex items-center w-full py-2 pl-2 pr-3 transition border cursor-pointer rounded-xl focus:ring-2 focus:ring-stone-200 hover:border-stone-300 gap-x-2"
        type="button"
        onClick={handleClick}
      >
        <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md" />
        <span className="flex-grow font-medium text-left text-gray-800 font-body">
          {selectedLabel}
        </span>
        <DropdownIcon size="w-3.5 h-3.5" color="text-gray-800" />
      </button>
      <div
        className={`absolute z-10 max-h-60 flex flex-col items-center w-full px-2 py-4 translate-y-full bg-stone-50 gap-y-px shadow-md -bottom-2 rounded-xl transform-gpu transition ease-in-out origin-top ${
          open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
      >
        {renderOptions()}
      </div>
    </div>
  )
}

export default QuestionTypeSelection
