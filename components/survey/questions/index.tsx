import Toast from '@components/toast'
import { ROUTES } from '@constants/routes'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import ReactPageScroller from 'react-page-scroller'
import { useMutation } from 'react-query'

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
  const { mutate: createResponse } = useMutation(
    (body: any) => axios.post(ROUTES.API.CREATE_RESPONSE, body),
    {
      onSuccess: () => {
        toast.success('Response saved! Now go away peacefully!')
      },
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
      const handleSubmit = () => {
        if (isLastPage)
          return createResponse({ responses, id: router.query.id })
        handleNext()
      }

      return (
        <SurveyQuestion
          key={question.id}
          question={question}
          response={responses[question.id]}
          handleResponseChange={handleResponseChange(question.id)}
          isLastPage={isLastPage}
          onSubmit={handleSubmit}
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
        blockScrollUp={false}
        blockScrollDown={false}
        customPageNumber={currentPage}
      >
        {renderQuestions()}
      </ReactPageScroller>
      <Toast />
    </>
  )
}

export default Questions
