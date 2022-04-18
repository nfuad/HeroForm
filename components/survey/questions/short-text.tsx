import { ChangeEventHandler, FC } from 'react'

type Props = {
  properties: any
  onChange: (newValue: string) => void
  value: string
}

const ShortText: FC<Props> = ({ properties, onChange, value }) => {
  const { placeholder, maxCharacters, isMaxLengthSpecified } = properties
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(e.target.value)

  return (
    <input
      className="w-full max-w-3xl text-2xl px-7 py-7 font-heading rounded-3xl placeholder:text-gray-300 placeholder:font-body"
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      maxLength={isMaxLengthSpecified ? maxCharacters : undefined}
      type="text"
      style={{
        boxShadow: '0px 14px 39px 10px rgba(235, 145, 145, 0.2)',
      }}
    />
  )
}

export default ShortText
