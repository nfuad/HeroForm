import { EditIcon } from '@components/icons'
import { ChangeEventHandler, FC, useRef } from 'react'
import { createOption } from '../helpers'
import { Option } from '../types'

type Props = {
  options: Option[]
  setOptions: (options: Option[]) => void
}

const MAX_OPTIONS = 10
const CHAR_CODE_OFFSET = 65

const Options: FC<Props> = ({ options, setOptions }) => {
  const optionsLimitReached = options.length === MAX_OPTIONS

  const handleChange =
    (id: string): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setOptions(
        options.map((option) => {
          const isSameOption = option.id === id
          if (isSameOption) return { ...option, value: e.target.value }
          return option
        }),
      )
    }

  const handleDelete = (id: string) => () => {
    setOptions(options.filter((option) => option.id !== id))
  }

  const handleAdd = () => {
    setOptions([...options, createOption(options.length + 1)])
  }

  const renderOptions = () => {
    return options.map(({ id, value }, index) => (
      <Option
        key={id}
        value={value}
        index={index}
        onChange={handleChange(id)}
        onDeleteClick={handleDelete(id)}
      />
    ))
  }

  return (
    <div className="flex flex-col items-center flex-shrink-0 mx-auto mt-8 gap-y-4">
      {renderOptions()}
      {!optionsLimitReached ? (
        <button
          type="button"
          className="w-1/2 px-2 py-2 mt-4 text-green-900 duration-300 bg-[#E2F7E3] hover:scale-95 transition-all duration-75 hover:shadow-md border rounded-lg text-sm font-heading hover:text-gray-900 focus:outline-none"
          onClick={handleAdd}
        >
          + Add option
        </button>
      ) : (
        <p className="text-xs text-gray-600">
          Max options ({MAX_OPTIONS}) reached.
        </p>
      )}
    </div>
  )
}

export default Options

const Option = ({ value, index, onChange, onDeleteClick }) => {
  const ref = useRef<HTMLInputElement>()

  return (
    <div className="group flex items-center bg-white hover:bg-white border text-base gap-x-3 w-max min-w-[384px] px-3 py-3 rounded-xl focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400 transition duration-300">
      <div className="flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-700 rounded-md bg-violet-100 w-7 h-7 font-body">
        {String.fromCharCode(index + CHAR_CODE_OFFSET)}
      </div>
      <input
        ref={ref}
        className="w-full text-base font-semibold tracking-wide text-gray-700 bg-transparent font-heading focus:outline-none"
        value={value}
        onChange={onChange}
        placeholder="Option"
      />
      <button
        onClick={() => {
          ref.current.focus()
        }}
        className="text-gray-400 transition-all hover:text-gray-900"
      >
        <EditIcon />
      </button>
      <button type="button" onClick={onDeleteClick}>
        <svg
          className="w-6 h-6 text-gray-500 transition duration-300 opacity-50 stroke-current hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
