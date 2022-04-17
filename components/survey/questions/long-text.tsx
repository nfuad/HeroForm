import { ChangeEventHandler, FC } from 'react'

type Props = {
  properties: any
  value: string
  onChange: (newValue: string) => void
}

const LongText: FC<Props> = ({ properties, value, onChange }) => {
  const { placeholder, maxCharacters } = properties
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    onChange(e.target.value)

  return (
    <textarea
      className="w-full max-w-3xl text-2xl px-7 py-7 font-heading rounded-3xl placeholder:text-gray-300 placeholder:font-body"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength={maxCharacters}
      style={{
        boxShadow: '0px 14px 39px 10px rgba(235, 145, 145, 0.2)',
      }}
      rows={3}
    />
  )
}

export default LongText
