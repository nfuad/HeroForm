import { Form } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

type Returns = {
  forms: Form[]
  loading: boolean
  error: boolean
}

export const useForms = (): Returns => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [forms, setForms] = useState<Form[]>([])

  const session = useSession()
  const status = session.status
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    ;(async () => {
      if (!isAuthenticated) return

      setLoading(true)
      try {
        const response = await fetch('/api/get-forms')

        const data = await response.json()
        setForms(data.forms)
      } catch (error) {
        console.error({ error })
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [isAuthenticated])

  return {
    forms,
    loading,
    error,
  }
}
