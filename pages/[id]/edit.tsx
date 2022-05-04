import { useEffect, useState } from 'react'
import Editor from '@components/admin/editor'
import Header from '@components/admin/editor/header'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { Container, Loader } from '@components/auth-screens'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import axios from 'axios'
import { ROUTES } from '@constants/routes'
import { PARAMS } from '@constants/params'
import { showConfettiAnimation } from '@lib/show-confetti-animation'
import { LOCAL_STORAGE } from '@constants/local-storage'

const EditorPage = () => {
  const [unsaved, setUnsaved] = useState(false)
  const [formName, setFormName] = useState('')
  const [questions, setQuestions] = useState({})
  const [selectedQuestionID, setSelectedQuestionID] = useState('')

  const router = useRouter()
  const { id } = router.query
  const {
    data: preloadedQuestionsData,
    isFetching: isFetchingQuestions,
    isError,
    error,
  }: {
    data: { questions: any; metadata: any; spreadsheetId: any }
    isFetching: boolean
    isError: boolean
    error: Error
  } = useQuery(`${ROUTES.API.GET_FORM}?${PARAMS.ID}=${id}`, {
    refetchOnReconnect: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
    onSuccess(data) {
      setQuestions(data.questions)
      const firstQuestionID = Object.keys(data.questions)[0] // need to sort this properly!
      setSelectedQuestionID(firstQuestionID)
      setFormName(data.metadata.title)
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
      onSuccess() {
        setUnsaved(false)
        toast.success('Form published!')
        router.push(`/${id}`)

        showConfettiAnimation()
      },
      onError(error: any) {
        setUnsaved(false) // will let the user close the tab, no need to keep the unsaved state
        console.log({ error })
        toast.error('Could not publish form. Try again later :)')
      },
    },
  )

  const handlePublishClick = () => {
    publishForm({ questions, id: id as string })
  }

  useEffect(() => {
    const handleEvent = (e) => {
      if (unsaved) {
        e.preventDefault()
        e.returnValue =
          'You have unsaved changes. Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleEvent)

    return () => {
      window.removeEventListener('beforeunload', handleEvent)
    }
  }, [unsaved])

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE.QUESTIONS,
      JSON.stringify(Object.values(questions)),
    )
  }, [questions])

  if (isFetchingQuestions) {
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

  const { spreadsheetId = '', metadata = {} } = preloadedQuestionsData || {}
  const { responseCount } = metadata

  return (
    <>
      <div className="overflow-hidden bg-slate-50">
        <div className="flex items-center justify-center h-screen lg:hidden">
          <p>Editor is currently unavailable on this viewport.</p>
        </div>
        <div className="flex-col hidden h-screen max-h-screen lg:flex">
          <Header
            publishButtonDisabled={publishFormLoading}
            handlePublishClick={handlePublishClick}
            formName={formName}
            responseCount={responseCount}
            publishFormLoading={publishFormLoading}
            spreadSheetLink={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
          />
          <Editor
            questions={questions}
            setQuestions={setQuestions}
            selectedQuestionID={selectedQuestionID}
            setSelectedQuestionID={setSelectedQuestionID}
            setUnsaved={setUnsaved}
          />
        </div>
      </div>
    </>
  )
}

export default EditorPage
