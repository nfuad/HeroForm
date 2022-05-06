import { ChangeEventHandler, FC, useEffect, useRef } from 'react'
import autosize from 'autosize'

type Props = {
  properties: any
  value: string
  onChange: (newValue: string) => void
  autoFocus?: boolean
}

const LongText: FC<Props> = ({ properties, value, onChange, autoFocus }) => {
  const { placeholder, maxCharacters, isMaxLengthSpecified } = properties
  const ref = useRef<HTMLTextAreaElement>(null)
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    onChange(e.target.value)

  useEffect(() => {
    if (autoFocus) ref.current?.focus()

    autosize(ref.current)
  }, [autoFocus])

  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-3">
      <textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={isMaxLengthSpecified ? maxCharacters : undefined}
        rows={1}
        className="bg-transparent text-lg max-w-lg w-full transition-all duration-200 ease-in-out border-b-2 border-gray-300 outline-none focus:border-gray-900 pb-1 h-min"
      />
      <p className="text-xs text-center ml-4 text-gray-600">
        Press <b>Shift ⇧ + Enter ↵</b> for line break
      </p>
    </div>
  )
}

export default LongText
