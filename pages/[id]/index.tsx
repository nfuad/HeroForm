import { useState } from 'react'

// https://firebase.google.com/docs/web/setup#available-libraries
import prisma from '@lib/prisma'
import Questions from '@components/survey/questions'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getQuestionsBySheetId } from '@lib/sheets/get-questions-by-sheet-id'
import { ChevronIcon, WarningIcon } from '@components/icons'
import { useRouter } from 'next/router'

type Props = {
  questions: any[]
}
const SurveyPage: NextPage<Props> = ({ questions = [] }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const isPreview = (router.query.preview as string) === 'true'

  if (isPreview) {
    // load questions from local storage if available
    const localQuestions = localStorage.getItem('questions')
    if (localQuestions) {
      questions = JSON.parse(localQuestions)
    }
  }

  const totalQuestions = questions.length
  const totalPages = totalQuestions + 2
  const isLastPage = totalPages === currentPage + 1
  const isFirstPage = currentPage === 0

  const scrollIndicator = ((currentPage + 1) / totalPages) * 100

  const handleNext = () => {
    if (isLastPage) return
    setCurrentPage((st) => st + 1)
  }
  const handlePrev = () => {
    if (isFirstPage) return
    setCurrentPage((st) => st - 1)
  }

  if (questions.length === 0) return null

  return (
    <Container>
      {isPreview && <PreviewBanner />}
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
      <Questions
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        questions={questions}
        handleNext={handleNext}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        isPreview={isPreview}
      />
    </Container>
  )
}

export default SurveyPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { google } = await import('googleapis')

  const { id } = params as Record<string, string>

  const form = await prisma.form.findUnique({
    where: {
      publicId: id,
    },
  })

  const accounts = await prisma.user
    .findUnique({
      where: {
        id: form.userId,
      },
    })
    .accounts()

  const account = accounts[0]
  const refreshToken = account.refresh_token

  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  })
  auth.setCredentials({ refresh_token: refreshToken })

  const { spreadsheetId } = form
  const questions = await getQuestionsBySheetId({ spreadsheetId, auth })

  return {
    props: {
      questions: Object.values(questions),
    },
  }
}

const ProgressBar = ({ scrollIndicator }) => (
  <div className="absolute z-50 w-full h-2 bg-gray-200">
    <div
      className="h-2 transition-all duration-1000 ease-in-out bg-gradient-to-r to-gradient-blue-one from-gradient-blue-two"
      style={{ width: `${scrollIndicator}%` }}
    />
  </div>
)

const Container = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/background.svg')`,
      }}
      className="relative w-full h-full bg-no-repeat bg-cover"
    >
      {children}
    </div>
  )
}

const DotIndicators = ({
  totalQuestions,
  currentPage,
  setCurrentPage,
  isSubmitted,
}) => {
  if (isSubmitted) return null

  return (
    <div className="absolute z-50 flex flex-col items-center justify-center space-y-3 right-5 top-1/2 translate-y-[-50%]">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setCurrentPage(index)
            }}
            className={`transition-all duration-300 ease-in-out cursor-pointer ${
              index === currentPage - 1
                ? 'bg-gradient-blue-one w-4 h-4'
                : 'bg-gray-200 w-2 h-2'
            } rounded-full`}
          />
        )
      })}
    </div>
  )
}

const ArrowNavigator = ({
  handleNext,
  handlePrev,
  isFirstPage,
  isLastPage,
  isSubmitted,
}) => {
  if (isSubmitted) return null

  return (
    <div className="absolute z-50 flex flex-row divide-x-2 divide-gray-300 rounded-lg shadow-3xl bottom-5 right-5">
      <button
        disabled={isFirstPage}
        onClick={handlePrev}
        className="p-3 bg-white rounded-l-lg cursor-pointer disabled:bg-gray-200 disabled:cursor-default disabled:hover:text-black hover:bg-gradient-to-r hover:to-gradient-blue-one hover:from-gradient-blue-two hover:text-white"
      >
        <ChevronIcon />
      </button>
      <button
        disabled={isLastPage}
        onClick={handleNext}
        className="p-3 bg-white rounded-r-lg cursor-pointer disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-black disabled:cursor-default hover:bg-gradient-to-r hover:to-gradient-blue-one hover:from-gradient-blue-two hover:text-white"
      >
        <ChevronIcon style="rotate-180" />
      </button>
    </div>
  )
}

const PreviewBanner = () => {
  return (
    <div className="fixed w-full top-10 z-100">
      <div className="flex items-center justify-center max-w-md px-5 py-2 mx-auto text-white rounded-lg bg-violet-600">
        <span>
          <WarningIcon />
        </span>
        <p className="mx-auto ml-2 tracking-wide text-center font-body">
          Preview Mode. Answers won't be submitted unless the actual form link
          is used.
        </p>
      </div>
    </div>
  )
}
