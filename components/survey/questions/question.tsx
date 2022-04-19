import { useRef, FC, FormEventHandler } from 'react'

import { QuestionType } from '@components/admin/editor/types'
import useIntersectionObserver from '@hooks/use-intersection-observer'
import ShortText from './short-text'
import LongText from './long-text'
import MultiChoice from './multi-choice'
import TransitionWrapper from './transition-wrapper'

type Props = {
  question: any
  response: any
  onSubmit: () => void
  handleResponseChange: (value: any) => void
  isLastPage: boolean
}

const SurveyQuestion: FC<Props> = ({
  question,
  response,
  handleResponseChange,
  onSubmit,
  isLastPage,
}) => {
  const ref = useRef()
  const entryScreen1 = useIntersectionObserver(ref, {})
  const isVisible = !!entryScreen1?.isIntersecting
  const { properties, prompt } = question

  const renderInput = () => {
    switch (question.type) {
      case QuestionType.SHORT_TEXT:
        return (
          <ShortText
            properties={properties}
            value={response}
            onChange={handleResponseChange}
          />
        )
      case QuestionType.LONG_TEXT:
        return (
          <LongText
            properties={properties}
            value={response}
            onChange={handleResponseChange}
          />
        )
      case QuestionType.MULTI_CHOICE:
        return (
          <MultiChoice
            properties={properties}
            question={question}
            selected={response}
            setSelected={handleResponseChange}
          />
        )
    }
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form
      ref={ref}
      className="flex flex-col items-center justify-center w-full h-full max-w-4xl mx-auto text-center gap-y-8 md:gap-y-12 lg:gap-y-16"
      onSubmit={handleSubmit}
    >
      <TransitionWrapper isVisible={isVisible}>
        <h1 className="text-xl md:text-3xl lg:text-6xl">{prompt}</h1>
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
        <button className="flex items-center justify-center px-5 py-3 space-x-2 text-white bg-black rounded-lg md:rounded-xl md:px-7 md:py-4 lg:py-4 shadow-3xl lg:px-7 font-heading lg:rounded-xl">
          <span className="text-xs tracking-wider md:text-sm lg:text-base">
            {isLastPage ? 'Submit' : 'Continue'}
          </span>
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
        </button>
      </TransitionWrapper>
    </form>
  )
}

export default SurveyQuestion
