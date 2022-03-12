import { FC } from 'react'

type Props = {
  size?: string
  color?: string
  className?: string
}

const Dropdown: FC<Props> = ({
  size = 'w-6 h-6',
  color = 'text-black',
  className = '',
}) => {
  return (
    <svg
      className={`fill-current ${className} ${size} ${color}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_302_6)">
        <path d="M12 18.1667L2.06176 8.15035C1.53491 7.62339 1.53491 6.76255 2.06176 6.23157C2.5886 5.70058 3.44273 5.70058 3.96957 6.23157L12 14.3251L20.0303 6.23157C20.5572 5.70058 21.4113 5.70058 21.9382 6.23157C22.465 6.76255 22.465 7.62339 21.9382 8.15438L12 18.1667Z" />
      </g>
      <defs>
        <clipPath id="clip0_302_6">
          <rect
            width="20.6667"
            height="12.3333"
            transform="translate(1.66663 5.83333)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Dropdown
