import useIntersectionObserver from '@hooks/use-intersection-observer'
import { useKeydown } from '@hooks/use-keydown'
import { FC, useRef } from 'react'
import Button from '@components/button'
import ShortcutHint from '@components/shortcut-hint'

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
    <div className="flex flex-col items-center justify-center w-full h-full max-w-4xl px-4 mx-auto text-center gap-y-8 md:gap-y-12 animate-fade-in">
      <h1 className="text-xl md:text-3xl lg:text-5xl lg:leading-tight">
        Hey, we got a few questions for you. Ready to get started?
      </h1>
      <div className="flex justify-center items-center">
        <Button onClick={handleNext}>OK, Let&apos;s Go!</Button>
        <ShortcutHint />
      </div>
    </div>
  )
}

export default InitialPage
