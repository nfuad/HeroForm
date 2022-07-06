import { FC, MouseEventHandler } from 'react'

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  bgColor?: string
  textColor?: string
  padding?: string
  borderRadius?: string
  showIcon?: boolean
  disabled?: boolean
}

const Button: FC<Props> = ({
  onClick,
  children = '',
  className = '',
  showIcon = true,
  disabled,
}) => {
  return (
    <button onClick={onClick} className={`${className}`} disabled={disabled}>
      <span className="text-xs tracking-wider md:text-sm lg:text-base">
        {children}
      </span>
      {showIcon && !disabled && (
        <span className="ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 lg:w-5 lg:h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
      <style jsx>
        {`
          button {
            min-height: 30px;
            height: full;
            font-size: 16px;
            background: transparent;
            border: none;
            position: relative;
            color: #f0f0f0;
            cursor: ${disabled ? 'default' : 'pointer'};
            z-index: 1;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            opacity: ${disabled ? '0.7' : '1'};
          }

          button::after,
          button::before {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: -99999;
            transition: all 0.4s;
          }

          button::before {
            transform: translate(0%, 0%);
            width: 100%;
            height: 100%;
            background: #28282d;
            border-radius: 10px;
          }

          button::after {
            transform: translate(-13.5px, -6px);
            width: 33px;
            height: 33px;
            background: #ffffff15;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border-radius: 50px;
            opacity: ${disabled ? '0' : '1'};
          }

          button:hover::before {
            transform: ${disabled ? 'translate(0,0)' : 'translate(5%, 20%)'};
            width: ${disabled ? '100%' : '110%'};
            height: ${disabled ? '100%' : '110%'};
          }

          button:hover::after {
            border-radius: ${disabled ? '50px' : '10px'};
            transform: ${disabled
              ? 'translate(-13.5px, -6px)'
              : 'translate(0, 0)'};
            width: ${disabled ? '33px' : '100%'};
            height: ${disabled ? '33px' : '100%'};
          }

          button:active::after {
            transition: 0s;
            transform: translate(0, 5%);
          }

          @media not all and (hover: hover) and (pointer: fine) {
            // button::before,
            button::after {
              display: none;
              all: unset;
            }
          }
        `}
      </style>
    </button>
  )
}

export default Button
