import { useEffect, useState } from 'react'
import type { Question } from '@components/admin/editor/types'
import Editor from '@components/admin/editor'
import Header from '@components/admin/editor/header'
import Toast from '@components/toast'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { Container, Loader } from '@components/continue'
import Button from '@components/button'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import axios from 'axios'
import { ROUTES } from '@constants/routes'

const EditorPage = () => {
  const [questions, setQuestions] = useState({})
  const router = useRouter()
  const { id } = router.query
  const {
    data: preloadedQuestionsData,
    isLoading,
    isError,
    error,
  }: {
    data: { questions: any }
    isLoading: boolean
    isError: boolean
    error: Error
  } = useQuery(`/api/get-questions?id=${id}`, {
    retry: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
    onSuccess(data) {
      setQuestions(data.questions)
    },
  })

  const {
    mutate: publishForm,
    isLoading: publishFormLoading,
    isSuccess: publishFormSuccess,
  } = useMutation(
    ({ questions, id }: { questions: any; id: string }) => {
      return axios.post(ROUTES.API.PUBLISH_FORM, {
        questions,
        id,
      })
    },
    {
      onSuccess({ data: { id } }) {
        console.log({ id })
        toast.success('Form published!')
        router.push(`/${id}`)
      },
      onError(error: any) {
        console.log({ error })
        toast.error('Could not publish form. Try again later :)')
      },
    },
  )

  const handlePublishClick = () => {
    publishForm({ questions, id: id as string })
  }

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  if (isError) {
    return (
      <Container>
        There was an error when fetching all the questions. Please try again
        later.
      </Container>
    )
  }

  // const questions = questionsData?.questions

  return (
    <>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-slate-50">
        <Header
          publishButtonDisabled={publishFormLoading}
          handlePublishClick={handlePublishClick}
          formName={id as string} // TODO: GET REAL FORM NAME
        />
        <Editor questions={questions} setQuestions={setQuestions} />
      </div>
      <Toast />
    </>
  )
}

export default EditorPage
