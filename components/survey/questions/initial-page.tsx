import { useKeydown } from '@hooks/use-keydown'
import { FC, useRef } from 'react'
import Button from '@components/button'
import ShortcutHint from '@components/shortcut-hint'

type Props = {
  handleNext: () => void
  currentPage: number
}

const InitialPage: FC<Props> = ({ handleNext, currentPage }) => {
  useKeydown({
    onKeyDown({ isEnterKeyPressed }) {
      if (isEnterKeyPressed) handleNext()
    },
    stopListening: currentPage !== 0,
  })

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-4xl px-4 mx-auto text-center gap-y-8 md:gap-y-12 animate-fade-in">
      <h1 className="text-xl md:text-3xl lg:text-5xl lg:leading-tight">
        Hey, we got a few questions for you. Ready to get started?
      </h1>
      <div className="flex items-center justify-center">
        <Button onClick={handleNext}>OK, Let&apos;s Go!</Button>
        <ShortcutHint />
      </div>
    </div>
  )
}

export default InitialPage
