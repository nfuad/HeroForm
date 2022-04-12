import { Dispatch, FC, SetStateAction, useState } from 'react'
import ReactPageScroller from 'react-page-scroller'

import SurveyQuestion from './question'

type Props = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  questions: any[]
  handleNext: () => void
}

const Questions: FC<Props> = ({
  currentPage,
  setCurrentPage,
  questions,
  handleNext,
}) => {
  const [responses, setResponses] = useState(() => {
    return questions.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: '',
      }),
      {},
    )
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResponseChange = (id: string) => (value: any) => {
    setResponses((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const renderQuestions = () => {
    return questions?.map((question) => (
      <SurveyQuestion
        key={question.id}
        question={question}
        response={responses[question.id]}
        handleNext={handleNext}
        handleResponseChange={handleResponseChange(question.id)}
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
