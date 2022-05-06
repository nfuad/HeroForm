import { ChangeEventHandler, FC, useEffect, useRef } from 'react'

type Props = {
  properties: any
  onChange: (newValue: string) => void
  value: string
  autoFocus?: boolean
}

const ShortText: FC<Props> = ({ properties, onChange, value, autoFocus }) => {
  const { placeholder, maxCharacters, isMaxLengthSpecified } = properties
  const ref = useRef<HTMLInputElement>(null)
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(e.target.value)

  useEffect(() => {
    if (autoFocus) ref.current?.focus()
  }, [autoFocus])

  return (
    <input
      ref={ref}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      maxLength={isMaxLengthSpecified ? maxCharacters : undefined}
      type="text"
      className="bg-transparent text-lg max-w-lg w-full transition-all duration-200 ease-in-out border-b-2 border-gray-300 outline-none focus:border-gray-900 pb-1"
    />
  )
}

export default ShortText
