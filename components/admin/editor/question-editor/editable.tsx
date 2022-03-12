import autosize from 'autosize'
import { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react'

type Props = {
  className?: string
  placeholder?: string
  value?: string
  onChange: (value: string) => void
}

const Editable: FC<Props> = ({ className, placeholder, value, onChange }) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    autosize(ref.current)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <textarea
      ref={ref}
      className={`bg-transparent border-none resize-none focus:outline-none ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      rows={1}
    />
  )
}

export default Editable
