import { useSession } from 'next-auth/react'
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
