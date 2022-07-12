import { useState } from 'react'

import Questions from '@components/survey/questions'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { LOCAL_STORAGE } from '@constants/local-storage'
import { showConfettiAnimation } from '@lib/show-confetti-animation'
import { ROUTES } from '@constants/routes'
import {
  Container,
  DotIndicators,
  ProgressBar,
  ArrowNavigator,
  PreviewBanner,
} from '@components/survey'
import { Loader } from '@components/loader'
import { PLAUSIBLE_EVENTS } from '@constants/plausible-events'

type Props = {
  redirectUrl?: string
  questions: any[]
}
const SurveyPage: NextPage<Props> = ({ redirectUrl, questions = [] }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [responses, setResponses] = useState(() => {
    return questions.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: '',
      }),
      {},
    )
  })
  const router = useRouter()

  const createResponse = async (body: any) => {
    try {
      await fetch(ROUTES.API.CREATE_RESPONSE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    } catch (error) {
      alert("The response couldn't be saved. Please try again later.")
    }
  }

  const isInitialPage = currentPage === 0
  const isPreview = (router.query.preview as string) === 'true'

  if (isPreview) {
    // load questions from local storage if available
    const localQuestions = localStorage.getItem(LOCAL_STORAGE.QUESTIONS)
    if (localQuestions) {
      questions = JSON.parse(localQuestions)
    }
  }

  const totalQuestions = questions.length
  const totalPages = totalQuestions + 2
  const isLastPage = totalPages === currentPage + 1
  const isFirstPage = currentPage === 0
  const isLastQuestion = currentPage === totalPages - 2

  const scrollIndicator = ((currentPage + 1) / totalPages) * 100

  const handleNext = () => {
    const currentQuestion = questions[currentPage - 1]
    const { id, properties } = currentQuestion || {}
    const { isRequired = false } = properties || {}
    const canGoNext = (!isRequired || responses[id]) && !isLastPage

    if (isInitialPage) {
      // @ts-ignore
      window?.plausible?.(PLAUSIBLE_EVENTS.START_FORM)
    }

    if (!canGoNext) {
      alert('This is required. Please answer before proceeding.')
      return
    }

    if (isLastQuestion) {
      if (!isPreview) {
        createResponse({ responses, id: router.query.id })
      }
      setIsSubmitted(true)
      showConfettiAnimation()
    }

    setCurrentPage((st) => st + 1)
  }
  const handlePrev = () => {
    if (isFirstPage) return
    setCurrentPage((st) => st - 1)
  }

  if (router.isFallback) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  if (totalQuestions === 0) {
    return <Container>There are no questions here.</Container>
  }

  return (
    <Container>
      {isPreview && <PreviewBanner />}
      {!isInitialPage && (
        <>
          <ProgressBar scrollIndicator={scrollIndicator} />
          <DotIndicators
            {...{ totalQuestions, currentPage, setCurrentPage, isSubmitted }}
          />
          <ArrowNavigator
            {...{
              handlePrev,
              handleNext,
              isFirstPage,
              isLastPage,
              isSubmitted,
            }}
          />
        </>
      )}
      <Questions
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        questions={questions}
        handleNext={handleNext}
        responses={responses}
        setResponses={setResponses}
        redirectUrl={redirectUrl}
      />
    </Container>
  )
}

export default SurveyPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // TODO: get the survey ids from the database
    paths: [],

    // see: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#when-is-fallback-true-useful
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Record<string, string>
  const prisma = (await import('@lib/prisma')).default

  const form = await prisma.form.findUnique({
    where: {
      publicId: id,
    },
    select: {
      redirectUrl: true,
      questions: {
        select: {
          id: true,
          type: true,
          prompt: true,
          options: true,
          properties: true,
        },
      },
    },
  })

  // see: https://nextjs.org/docs/api-reference/data-fetching/get-static-props#notfound
  if (!form) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      // pass the questions to the page
      questions: form.questions,
      redirectUrl: form.redirectUrl,
    },
    // re-generate the post at most once every 10 seconds if a request comes in
    revalidate: 10,
  }
}
