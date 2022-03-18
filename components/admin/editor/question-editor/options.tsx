import { ChangeEventHandler, FC } from 'react'
import { createOption } from '../helpers'
import { Option } from '../types'

type Props = {
  options: Option[]
  setOptions: (options: Option[]) => void
}

const Options: FC<Props> = ({ options, setOptions }) => {
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

  const handleAdd = () => {
    setOptions([...options, createOption()])
  }

  const renderOptions = () => {
    return options.map(({ id, value }) => (
      <div
        key={id}
        className="flex items-center bg-white border-2 border-zinc-800 gap-x-3 w-max min-w-[384px] p-3 rounded-xl focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400 transition duration-300"
      >
        <div className="px-2 text-2xl font-bold text-gray-700 border-2 rounded-lg border-zinc-800 font-body">
          A
        </div>
        <input
          className="w-full text-2xl font-semibold text-gray-700 font-body focus:outline-none"
          value={value}
          onChange={handleChange(id)}
        />
      </div>
    ))
  }

  return (
    <div className="flex flex-col items-center mx-auto mt-8 gap-y-4">
      {renderOptions()}
      <button
        type="button"
        className="mt-4 text-xl font-semibold text-gray-700 transition duration-300 font-body hover:text-gray-900 focus:outline-none"
        onClick={handleAdd}
      >
        + Add option
      </button>
    </div>
  )
}

export default Options
