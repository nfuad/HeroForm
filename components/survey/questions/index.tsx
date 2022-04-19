import Toast from '@components/toast'
import { ROUTES } from '@constants/routes'
import { useKeydown } from '@hooks/use-keydown'
import { showConfettiAnimation } from '@lib/show-confetti-animation'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import ReactPageScroller from 'react-page-scroller'
import { useMutation } from 'react-query'
import InitialPage from './initial-page'

import SurveyQuestion from './question'
import SuccessPage from './success-page'

type Props = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  isSubmitted: boolean
  setIsSubmitted: Dispatch<SetStateAction<boolean>>
  questions: any[]
  handleNext: () => void
  isPreview: boolean
}

const Questions: FC<Props> = ({
  currentPage,
  setCurrentPage,
  isSubmitted,
  setIsSubmitted,
  questions,
  handleNext,
  isPreview,
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
  const { mutate: createResponse } = useMutation(
    (body: any) => axios.post(ROUTES.API.CREATE_RESPONSE, body),
    {
      onError: () => {
        toast.error(
          'Could not save response. Looks like someone needs an internet plan upgrade.',
        )
      },
    },
  )
  const router = useRouter()

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
        if (isLastPage) {
          if (!isPreview) {
            createResponse({ responses, id: router.query.id })
          }
          setIsSubmitted(true)
          showConfettiAnimation()
        }
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
        blockScrollUp={isSubmitted}
        blockScrollDown={isSubmitted}
        customPageNumber={currentPage}
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
