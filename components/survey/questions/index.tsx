import { Dispatch, FC, SetStateAction, useState } from 'react'
import ReactPageScroller from 'react-page-scroller'

import type { Question as QuestionType } from '@components/admin/editor/types'
import SurveyQuestion from './question'

type Props = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  questions: QuestionType[]
  handleNext: () => void
}

const Questions: FC<Props> = ({
  currentPage,
  setCurrentPage,
  questions,
  handleNext,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const renderQuestions = () => {
    return questions?.map((question, index) => (
      <SurveyQuestion
        key={question.id}
        index={index}
        question={question}
        handleNext={handleNext}
      />
    ))
  }

  return (
    <ReactPageScroller
      renderAllPagesOnFirstRender={true}
      onBeforePageScroll={(nextPageIndex) => {
        setCurrentPage(nextPageIndex)
      }}
      transitionTimingFunction="cubic-bezier(0.95, 0.05, 0.08, 1.01)"
      animationTimer={1000}
      blockScrollUp={isSubmitted}
      blockScrollDown={isSubmitted}
      customPageNumber={currentPage}
    >
      {renderQuestions()}
    </ReactPageScroller>
  )
}

export default Questions
