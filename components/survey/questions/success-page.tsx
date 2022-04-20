import useIntersectionObserver from '@hooks/use-intersection-observer'
import { FC, useRef } from 'react'
import TransitionWrapper from './transition-wrapper'

const SuccessPage: FC = () => {
  const ref = useRef()
  const entryScreen1 = useIntersectionObserver(ref, {})
  const isVisible = !!entryScreen1?.isIntersecting

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center w-full h-full max-w-4xl px-4 mx-auto text-center gap-y-8 md:gap-y-12 lg:gap-y-16"
    >
      <TransitionWrapper isVisible={isVisible}>
        <h1 className="text-xl md:text-3xl lg:text-6xl">
          Thank You for your response!
        </h1>
      </TransitionWrapper>
    </div>
  )
}

export default SuccessPage
