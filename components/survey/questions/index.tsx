import Toast from '@components/toast'
import { Dispatch, FC, SetStateAction } from 'react'
import ReactPageScroller from 'react-page-scroller'
import InitialPage from './initial-page'

import SurveyQuestion from './question'
import SuccessPage from './success-page'

type Props = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  responses: Record<string, string>
  setResponses: Dispatch<SetStateAction<Record<string, string>>>
  questions: any[]
  handleNext: () => void
}

const Questions: FC<Props> = ({
  currentPage,
  setCurrentPage,
  responses,
  setResponses,
  questions,
  handleNext,
}) => {
  const handleResponseChange = (id: string) => (value: any) => {
    setResponses((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const renderQuestions = () => {
    return questions?.map((question, index) => {
      const isLastPage = index === questions?.length - 1
      const handleEnter = () => {
        handleNext()
      }

      return (
        <SurveyQuestion
          key={question.id}
          question={question}
          response={responses[question.id]}
          handleResponseChange={handleResponseChange(question.id)}
          isLastPage={isLastPage}
          handleEnter={handleEnter}
        />
      )
    })
  }

  return (
    <>
      <ReactPageScroller
        renderAllPagesOnFirstRender={true}
        onBeforePageScroll={(nextPageIndex) => {
          setCurrentPage(nextPageIndex)
        }}
        transitionTimingFunction="cubic-bezier(0.95, 0.05, 0.08, 1.01)"
        animationTimer={1000}
        customPageNumber={currentPage}
        blockScrollUp
        blockScrollDown
      >
        <InitialPage handleNext={handleNext} />
        {renderQuestions()}
        <SuccessPage />
      </ReactPageScroller>
      <Toast />
    </>
  )
}

export default Questions
