import { ChangeEventHandler, FC } from 'react'
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
    setOptions([...options, createOption()])
  }

  const renderOptions = () => {
    return options.map(({ id, value }, index) => (
      <div
        key={id}
        className="group flex items-center bg-white border-2 border-zinc-800 gap-x-3 w-max min-w-[384px] p-3 rounded-xl focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400 transition duration-300"
      >
        <div className="flex items-center justify-center flex-shrink-0 text-2xl font-bold text-gray-700 border-2 rounded-lg w-9 h-9 border-zinc-800 font-body">
          {String.fromCharCode(index + CHAR_CODE_OFFSET)}
        </div>
        <input
          className="w-full text-2xl font-semibold text-gray-700 font-body focus:outline-none"
          value={value}
          onChange={handleChange(id)}
          placeholder="Option"
        />
        <button type="button" onClick={handleDelete(id)}>
          <svg
            className="w-6 h-6 text-gray-700 transition duration-300 opacity-0 stroke-current hover:text-red-500 group-hover:opacity-100"
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
    ))
  }

  return (
    <div className="flex flex-col items-center flex-shrink-0 mx-auto mt-8 gap-y-4">
      {renderOptions()}
      {!optionsLimitReached && (
        <button
          type="button"
          className="mt-4 text-xl font-semibold text-gray-700 transition duration-300 font-body hover:text-gray-900 focus:outline-none"
          onClick={handleAdd}
        >
          + Add option
        </button>
      )}
    </div>
  )
}

export default Options
