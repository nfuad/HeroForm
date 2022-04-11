import { FC } from 'react'

type Props = {
  placeholder: string
}

const LongText: FC<Props> = ({ placeholder }) => {
  return (
    <textarea
      className="w-full max-w-3xl text-2xl px-7 py-7 font-heading rounded-3xl placeholder:text-gray-300 placeholder:font-body"
      placeholder={placeholder}
      style={{
        boxShadow: '0px 14px 39px 10px rgba(235, 145, 145, 0.2)',
      }}
      rows={3}
    />
  )
}

export default LongText
