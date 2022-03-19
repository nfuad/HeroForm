import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import PropertyEditor from './property-editor'
import QuestionEditor from './question-editor'
import QuestionList from './question-list'
import type { Question } from './types'

type Props = {
  questions: Question[]
  setQuestions: Dispatch<SetStateAction<Question[]>>
}
const Editor: FC<Props> = ({ questions, setQuestions }) => {
  const [selectedID, setSelectedID] = useState<string>('')

  const selectedQuestion = useMemo(
    () => questions.find(({ id }) => id === selectedID),
    [questions, selectedID],
  )

  const updateSelectedQuestion = (newQuestion: Question) => {
    setQuestions((prevState) =>
      prevState.map((question) => {
        if (question.id === selectedID) return newQuestion
        return question
      }),
    )
  }

  return (
    <div className="flex items-start flex-grow px-6 py-8 rounded-t-[2rem] gap-x-8 bg-stone-100 shadow-top">
      <QuestionList
        questions={questions}
        selectedID={selectedID}
        setQuestions={setQuestions}
        setSelectedID={setSelectedID}
      />
      <QuestionEditor
        question={selectedQuestion}
        updateSelectedQuestion={updateSelectedQuestion}
      />
      <PropertyEditor
        question={selectedQuestion}
        updateSelectedQuestion={updateSelectedQuestion}
      />
    </div>
  )
}

export default Editor
