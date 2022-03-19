import { Question } from '@components/admin/editor/types'
import { useState } from 'react'
import Editor from '@components/admin/editor'
import Header from '@components/admin/header'

const AdminPage = () => {
  const [questions, setQuestions] = useState<Question[]>([])

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-50">
      <Header questions={questions} />
      <Editor questions={questions} setQuestions={setQuestions} />
    </div>
  )
}

export default AdminPage
