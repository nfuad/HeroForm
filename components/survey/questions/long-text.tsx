import { ChangeEventHandler, FC, useEffect, useRef } from 'react'

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

  return (
    <textarea
      ref={ref}
      className="w-full max-w-xs px-3 py-3 text-lg md:text-xl md:px-5 md:py-5 md:max-w-lg md:rounded-2xl lg:max-w-3xl rounded-xl lg:text-2xl lg:px-7 lg:py-7 font-heading lg:rounded-3xl placeholder:text-gray-300 placeholder:font-body"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength={isMaxLengthSpecified ? maxCharacters : undefined}
      style={{
        boxShadow: '0px 14px 39px 10px rgba(235, 145, 145, 0.2)',
      }}
      rows={3}
    />
  )
}

export default LongText
