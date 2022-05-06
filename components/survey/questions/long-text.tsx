import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react'
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
  }, [autoFocus])

  useEffect(() => {
    autosize(ref.current)
  }, [])

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const isEnterKeyPressed = e.key === 'Enter'
    const isShiftKeyPressed = e.shiftKey
    if (isEnterKeyPressed && !isShiftKeyPressed) return e.preventDefault()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-3">
      <textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={isMaxLengthSpecified ? maxCharacters : undefined}
        rows={1}
        className="w-full max-w-lg pb-1 text-lg transition-all duration-200 ease-in-out bg-transparent border-b-2 border-gray-300 outline-none focus:border-gray-900 h-min"
        onKeyDown={handleKeyDown}
      />
      <p className="ml-4 text-xs text-center text-gray-600">
        Press <b>Shift ⇧ + Enter ↵</b> for line break
      </p>
    </div>
  )
}

export default LongText
