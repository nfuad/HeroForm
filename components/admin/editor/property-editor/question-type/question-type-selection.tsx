import { FC, useState } from 'react'
import { Dropdown } from '../../../../icons'

type Props = {
  className?: string
  selected: string
}

const options = [
  {
    id: 'short-text',
    label: 'Short Text',
  },
  {
    id: 'long-text',
    label: 'Long Text',
  },
]

const QuestionTypeSelection: FC<Props> = ({ className = '', selected }) => {
  const [open, setOpen] = useState(false)
  const selectedLabel = options.find(({ id }) => id === selected)?.label

  const handleClick = () => setOpen((prevState) => !prevState)

  const renderOptions = () => {
    return options.map(({ label, id }) => {
      const isSelected = selected === id
      const handleSelect = () => setOpen(false)

      return (
        <button
          key={`question-type-${label}`}
          className={`px-2 py-2.5 font-medium text-left text-gray-800 font-body rounded-lg focus:ring-2 focus:ring-blue-200 transition ${
            isSelected ? 'bg-blue-100' : 'hover:bg-blue-50'
          }`}
          type="button"
          onClick={handleSelect}
        >
          {label}
        </button>
      )
    })
  }

  return (
    <div className={`relative min-h-[42px] ${className}`}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 transition border cursor-pointer rounded-xl focus:ring-2 focus:ring-stone-200 hover:border-stone-300"
        type="button"
        onClick={handleClick}
      >
        <span className="font-medium text-gray-800 font-body">
          {selectedLabel}
        </span>
        <Dropdown size="w-3.5 h-3.5" color="text-gray-800" />
      </button>
      <div
        className={`absolute z-10 max-h-60 overflow-y-scroll flex flex-col items-stretch w-full px-2 py-4 translate-y-full bg-stone-50 gap-y-px shadow-md -bottom-2 rounded-xl transform-gpu transition ease-in-out origin-top ${
          open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
      >
        {renderOptions()}
      </div>
    </div>
  )
}

export default QuestionTypeSelection
