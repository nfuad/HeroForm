import { useEffect, useState } from 'react'
import type { Question } from '@components/admin/editor/types'
import Editor from '@components/admin/editor'
import Header from '@components/admin/editor/header'
// import { useQuestions } from '@components/admin/editor/use-questions'
import Toast from '@components/toast'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { Container, Loader } from '@components/continue'
/**
 * 
 * import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Question } from './types'

export const useQuestions = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  const session = useSession()
  const status = session.status
  const isAuthenticated = status === 'authenticated'

  const router = useRouter()
  const { id } = router.query as Record<string, string>

  useEffect(() => {
    ;(async () => {
      if (!isAuthenticated) return

      setLoading(true)
      try {
        const response = await fetch(`/api/get-questions?id=${id}`)
        const data = await response.json()
        setQuestions(data.questions)
      } catch (error) {
        console.error({ error })
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [isAuthenticated, id])

  return {
    questions,
    loading,
    error,
  }
}

 */
const EditorPage = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: questionsData,
    isLoading,
    isError,
    error,
  } = useQuery(`/api/get-questions?id=${id}`, {
    enabled: !!id,
  })

  console.log({ isError, isLoading, error })

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

  return <div>{JSON.stringify(questionsData, null, 2)}</div>
  // const [questions, setQuestions] = useState<Question[]>([])

  // useEffect(() => {
  //   if (!loading) setQuestions(preloadedQuestions)
  // }, [preloadedQuestions, loading])

  // if (loading) return <p>Loading like a pro</p>
  // if (error) return <p>There is an error</p>

  // return (
  //   <>
  //     <div className="flex flex-col h-screen max-h-screen bg-slate-50">
  //       <Header questions={questions} />
  //       <Editor questions={questions} setQuestions={setQuestions} />
  //     </div>
  //     <Toast />
  //   </>
  // )
}

export default EditorPage
