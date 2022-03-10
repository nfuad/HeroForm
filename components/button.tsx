import { FC, MouseEventHandler } from 'react'

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  bgColor?: string
  textColor?: string
  padding?: string
  borderRadius?: string
}

const Button: FC<Props> = ({
  onClick,
  className = '',
  bgColor = 'bg-black',
  textColor = 'text-white',
  padding = 'py-4 px-7',
  borderRadius = 'rounded-xl',
  children,
}) => {
  return (
    <button
      className={`flex items-center justify-center space-x-2 font-heading ${className} ${bgColor} ${textColor} ${padding} ${borderRadius}`}
      onClick={onClick}
    >
      <span className='tracking-wider'>{children}</span>
    </button>
  )
}

export default Button
