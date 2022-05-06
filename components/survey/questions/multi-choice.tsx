import { Question } from '@components/admin/editor/types'
import { useKeydown } from '@hooks/use-keydown'
import { FC, MouseEventHandler } from 'react'

type Props = {
  question: Question
  selected: string
  setSelected: (value: string) => void
}

const MultiChoice: FC<Props> = ({ question, selected, setSelected }) => {
  useKeydown({
    onKeyDown({ key }) {
      if (key.length !== 1) return

      const index = key.toUpperCase().charCodeAt(0) - CHAR_CODE_OFFSET
      const isIndexInRange = index >= 0 && index < question.options.length

      if (isIndexInRange) setSelected(question.options[index].value)
    },
  })

  const renderOptions = () => {
    return question.options.map((option, index) => {
      const isSelected = selected === option.value
      const handleClick = () => setSelected(option.value)

      return (
        <Option
          key={option.id}
          index={index}
          onClick={handleClick}
          isSelected={isSelected}
        >
          {option.value}
        </Option>
      )
    })
  }

  return (
    <div className="flex flex-col items-center w-full mt-8 space-y-4">
      {renderOptions()}
    </div>
  )
}

export default MultiChoice

type OptionProps = {
  index: number
  isSelected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}
const CHAR_CODE_OFFSET = 65
const Option: FC<OptionProps> = ({ index, isSelected, children, onClick }) => {
  return (
    <button
      type="button"
      className={`group flex items-center bg-white hover:bg-white border text-base gap-x-3 w-full max-w-[384px] pl-3 pr-[3.25rem] py-3 rounded-xl transition duration-300 ${
        isSelected ? 'ring-4 ring-blue-100 border-blue-400' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-700 rounded-md md:text-base bg-violet-100 w-7 h-7 font-body">
        {String.fromCharCode(index + CHAR_CODE_OFFSET)}
      </div>
      <p className="flex-grow text-sm font-semibold tracking-wide text-gray-700 bg-transparent md:text-base font-heading focus:outline-none">
        {children}
      </p>
    </button>
  )
}
