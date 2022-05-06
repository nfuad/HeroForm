import { useRef, FC } from 'react'

import { QuestionType } from '@components/admin/editor/types'
import useIntersectionObserver from '@hooks/use-intersection-observer'
import ShortText from './short-text'
import LongText from './long-text'
import MultiChoice from './multi-choice'
import TransitionWrapper from './transition-wrapper'
import { useKeydown } from '@hooks/use-keydown'
import Button from '@components/button'

type Props = {
  question: any
  response: any
  handleResponseChange: (value: any) => void
  isLastPage: boolean
  handleEnter: () => void
}

const SurveyQuestion: FC<Props> = ({
  question,
  response,
  handleResponseChange,
  isLastPage,
  handleEnter,
}) => {
  const ref = useRef()
  const entryScreen1 = useIntersectionObserver(ref, {})
  const isVisible = !!entryScreen1?.isIntersecting
  const { properties, prompt } = question

  useKeydown({
    onKeyDown({ nativeEvent, isEnterKeyPressed, isShiftKeyPressed }) {
      const isLongText = question.type === QuestionType.LONG_TEXT

      if (isLongText) {
        if (isEnterKeyPressed && isShiftKeyPressed) {
          nativeEvent.preventDefault()
          handleEnter()
        }
      } else if (isEnterKeyPressed && !isShiftKeyPressed) {
        handleEnter()
      }
    },
    stopListening: !isVisible,
  })

  const renderInput = () => {
    switch (question.type) {
      case QuestionType.SHORT_TEXT:
        return (
          <ShortText
            properties={properties}
            value={response}
            onChange={handleResponseChange}
            autoFocus={isVisible}
          />
        )
      case QuestionType.LONG_TEXT:
        return (
          <LongText
            properties={properties}
            value={response}
            onChange={handleResponseChange}
            autoFocus={isVisible}
          />
        )
      case QuestionType.MULTI_CHOICE:
        return (
          <MultiChoice
            question={question}
            selected={response}
            setSelected={handleResponseChange}
          />
        )
    }
  }

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center w-full h-full max-w-4xl px-4 mx-auto text-center gap-y-8 md:gap-y-12 lg:gap-y-16"
    >
      <TransitionWrapper isVisible={isVisible}>
        <h1 className="text-xl md:text-3xl lg:text-4xl">{prompt}</h1>
      </TransitionWrapper>

      <TransitionWrapper
        isVisible={isVisible}
        enterFrom="opacity-0 scale-90 translate-y-12"
        enterTo="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 translate-y-6"
      >
        {renderInput()}
      </TransitionWrapper>

      <TransitionWrapper isVisible={isVisible}>
        <Button onClick={handleEnter}>
          {isLastPage ? 'Submit' : 'Continue'}
        </Button>
        <p className="text-xs text-center ml-4">
          Press <b>Enter ↵</b>
        </p>
      </TransitionWrapper>
    </div>
  )
}

export default SurveyQuestion
