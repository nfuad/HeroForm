import useIntersectionObserver from '@hooks/use-intersection-observer'
import { useKeydown } from '@hooks/use-keydown'
import { FC, useRef } from 'react'
import Button from '@components/button'
import TransitionWrapper from './transition-wrapper'

type Props = {
  handleNext: () => void
}

const InitialPage: FC<Props> = ({ handleNext }) => {
  const ref = useRef()
  const entryScreen1 = useIntersectionObserver(ref, {})
  const isVisible = !!entryScreen1?.isIntersecting

  useKeydown({
    onKeyDown({ isEnterKeyPressed }) {
      if (isEnterKeyPressed) handleNext()
    },
    stopListening: !isVisible,
  })

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center w-full h-full max-w-4xl px-4 mx-auto text-center gap-y-8 md:gap-y-12"
    >
      <TransitionWrapper isVisible={isVisible}>
        <h1 className="text-xl md:text-3xl lg:text-5xl lg:leading-tight">
          Hey, we got a few questions for you. Ready to get started?
        </h1>
      </TransitionWrapper>

      <TransitionWrapper isVisible={isVisible}>
        <Button onClick={handleNext}>OK, Let&apos;s Go!</Button>
        <p className="text-xs text-center ml-4">
          Press <b>Enter ↵</b>
        </p>
      </TransitionWrapper>
    </div>
  )
}

export default InitialPage
