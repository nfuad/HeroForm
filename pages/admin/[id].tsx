import { useEffect, useState } from 'react'
import type { Question } from '@components/admin/editor/types'
import Editor from '@components/admin/editor'
import Header from '@components/admin/editor/header'
import { useQuestions } from '@components/admin/editor/use-questions'

const EditorPage = () => {
  const { questions: preloadedQuestions, loading, error } = useQuestions()
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    if (!loading) setQuestions(preloadedQuestions)
  }, [preloadedQuestions, loading])

  if (loading) return <p>Loading like a pro</p>
  if (error) return <p>There is an error</p>

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-50">
      <Header questions={questions} />
      <Editor questions={questions} setQuestions={setQuestions} />
    </div>
  )
}

export default EditorPage
