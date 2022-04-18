import useIntersectionObserver from '@hooks/use-intersection-observer'
import { FC, useRef } from 'react'
import TransitionWrapper from './transition-wrapper'

type Props = {
  handleNext: () => void
}

const InitialPage: FC<Props> = ({ handleNext }) => {
  const ref = useRef()
  const entryScreen1 = useIntersectionObserver(ref, {})
  const isVisible = !!entryScreen1?.isIntersecting

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center w-full h-full max-w-4xl mx-auto text-center gap-y-16"
    >
      <TransitionWrapper isVisible={isVisible}>
        <h1 className="text-lg sm:text-xl md:text-3xl lg:text-6xl">
          Are You Ready?
        </h1>
      </TransitionWrapper>

      <TransitionWrapper isVisible={isVisible}>
        <button
          onClick={handleNext}
          className="flex items-center justify-center py-4 space-x-2 text-white bg-black shadow-3xl px-7 font-heading rounded-xl"
        >
          <span className="tracking-wider">Get Started</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </TransitionWrapper>
    </div>
  )
}

export default InitialPage
