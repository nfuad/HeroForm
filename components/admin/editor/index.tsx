import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { createQuestion } from './helpers'
import PropertyEditor from './property-editor'
import QuestionTypeSelection from './property-editor/type/question-type-selection'
import QuestionEditor from './question-editor'
import Container from './question-editor/container'
import QuestionPrompt from './question-editor/question-prompt'
import QuestionList from './question-list'
import QuestionItem from './question-list/question-item'
import { Question, QuestionType } from './types'
import Options from './question-editor/options'
import { nanoid } from 'nanoid'
import toast from 'react-hot-toast'
import set from 'lodash.set'

type Props = {
  questions: any
  setQuestions: Dispatch<SetStateAction<Question[]>>
  selectedQuestionID: string
  setSelectedQuestionID: Dispatch<SetStateAction<string>>
}
const Editor: FC<Props> = ({
  questions,
  setQuestions,
  selectedQuestionID,
  setSelectedQuestionID,
}) => {
  const handleAdd = () => {
    const newQuestion = createQuestion({
      order: Object.keys(questions).length + 1,
    })
    setQuestions((prevState) => {
      return {
        ...prevState,
        [newQuestion.id]: newQuestion,
      }
    })
    setSelectedQuestionID(newQuestion.id)
  }

  const handleDelete = () => {
    if (Object.keys(questions).length === 1) {
      toast.error('You must have at least one question.')
      return
    }

    const currentQuestionOrder = questions[selectedQuestionID].properties.order
    const prevQuestionID = Object.values(questions)
      .filter(
        (question: any) =>
          question.properties.order === currentQuestionOrder - 1,
      )
      .map((question: any) => question.id)[0]

    console.log({ currentQuestionOrder, prevQuestionID })

    setQuestions((prevState) => {
      const newState = { ...prevState }
      delete newState[selectedQuestionID]
      return newState
    })
    setSelectedQuestionID(prevQuestionID)
  }

  const renderQuestions = () => {
    return Object.values(questions).map((question: any, index) => {
      const questionID = question.id
      const selected = selectedQuestionID === questionID
      const handleSelectClick = () => setSelectedQuestionID(questionID)
      const order = index + 1

      return (
        <QuestionItem
          order={order}
          key={questionID}
          question={question}
          selected={selected}
          onClick={handleSelectClick}
        />
      )
    })
  }

  const isShortText =
    questions[selectedQuestionID]?.type === QuestionType.SHORT_TEXT
  const isLongText =
    questions[selectedQuestionID]?.type === QuestionType.LONG_TEXT
  const isMultiChoice =
    questions[selectedQuestionID]?.type === QuestionType.MULTI_CHOICE

  const question = questions[selectedQuestionID]

  const { id, prompt, type } = question || {}

  const {
    isRequired,
    isMultipleSelectionAllowed,
    isOtherOptionAllowed,
    isMaxLengthSpecified,
    placeholder,
    maxCharacters,
    order,
  } = question?.properties || {}

  const handleQuestionChange = (key: string, value: any) => {
    setQuestions((prevState) => {
      const copy = { ...prevState }
      const path = `${selectedQuestionID}.${key}`
      set(copy, path, value)
      return copy
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="h-screen max-w-[300px] w-full px-3 pt-5 pb-20 text-gray-900 bg-white border-r border-gray-200 overflow-auto">
        <div className="flex items-center justify-between px-3">
          <h2>Questions</h2>
          <AddButton onClick={handleAdd} />
        </div>

        <div className="flex flex-col py-4 gap-y-2">{renderQuestions()}</div>
      </div>

      <div className="w-full max-w-7xl">
        <Container>
          <QuestionPrompt
            prompt={prompt}
            onChange={(newPrompt: string) =>
              handleQuestionChange('prompt', newPrompt)
            }
          />

          {isShortText && (
            <input
              className="flex-shrink-0 w-full max-w-3xl mx-auto mt-8 text-2xl bg-white px-7 py-7 font-heading rounded-3xl placeholder:text-gray-300 placeholder:font-body"
              placeholder={placeholder}
              type="text"
              style={{
                boxShadow: '0px 14px 39px 10px rgba(235, 145, 145, 0.2)',
              }}
              disabled
            />
          )}
          {isLongText && (
            <textarea
              className="flex-shrink-0 w-full max-w-3xl mx-auto mt-8 text-2xl bg-white resize-none px-7 py-7 font-heading rounded-3xl placeholder:text-gray-300 placeholder:font-body"
              placeholder={placeholder}
              style={{
                boxShadow: '0px 14px 39px 10px rgba(235, 145, 145, 0.2)',
              }}
              rows={5}
              disabled
            />
          )}
          {isMultiChoice && <Options options={[]} setOptions={() => {}} />}
        </Container>
      </div>

      <div className="h-screen max-w-[300px] w-full px-6 pt-5 pb-20 text-gray-900 bg-white border-l border-gray-200 overflow-auto">
        {selectedQuestionID && (
          <div className="flex flex-col py-4 gap-y-2">
            <h2 className="mb-3 text-sm tracking-wider text-gray-900 font-heading">
              Properties
            </h2>
            <div className="flex flex-col my-2 gap-y-2">
              <label htmlFor={'anything'} className="text-sm font-body">
                Type
              </label>
              <QuestionTypeSelection
                selected={type}
                onChange={(newType: QuestionType) =>
                  handleQuestionChange('type', newType)
                }
              />
            </div>
            <div className="flex items-center justify-between my-2">
              <label htmlFor={'required'} className="text-sm font-body">
                Required
              </label>
              <input
                checked={isRequired}
                onChange={() =>
                  handleQuestionChange('properties.isRequired', !isRequired)
                }
                name="required"
                id="required"
                type="checkbox"
              />
            </div>
            <div className="flex items-center justify-between my-2">
              <label
                htmlFor={'multiple-selection'}
                className="text-sm font-body"
              >
                Multiple Selection
              </label>
              <input
                checked={isMultipleSelectionAllowed}
                onChange={() =>
                  handleQuestionChange(
                    'properties.isMultipleSelectionAllowed',
                    !isMultipleSelectionAllowed,
                  )
                }
                name="multiple-selection"
                id="multiple-selection"
                type="checkbox"
              />
            </div>
            <div className="flex items-center justify-between my-2">
              <label htmlFor={'other-option'} className="text-sm font-body">
                Other Option
              </label>
              <input
                checked={isOtherOptionAllowed}
                onChange={() =>
                  handleQuestionChange(
                    'properties.isOtherOptionAllowed',
                    !isOtherOptionAllowed,
                  )
                }
                name="other-option"
                id="other-option"
                type="checkbox"
              />
            </div>
            <div className="flex flex-col items-start justify-between my-2">
              <div className="flex items-center justify-between w-full">
                <label htmlFor={'max-characters'} className="text-sm font-body">
                  Max Characters
                </label>
                <input
                  checked={isMaxLengthSpecified}
                  onChange={() =>
                    handleQuestionChange(
                      'properties.isMaxLengthSpecified',
                      !isMaxLengthSpecified,
                    )
                  }
                  name="max-characters"
                  id="max-characters"
                  type="checkbox"
                />
              </div>
              {isMaxLengthSpecified && (
                <input
                  value={maxCharacters}
                  onChange={(event) => {
                    console.log({ val: event.target.value })
                    handleQuestionChange(
                      'properties.maxCharacters',
                      parseInt(event.target.value),
                    )
                  }}
                  type="number"
                  className="w-full px-2 py-1 mt-2 text-sm border-2 rounded-md"
                />
              )}
            </div>

            <DeleteButton onClick={handleDelete} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Editor

const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="py-1 mt-10 text-sm tracking-wider text-red-500 transition-all duration-75 border-2 border-red-300 rounded-md hover:text-red-900 font-heading hover:bg-red-100 hover:shadow-md"
  >
    Delete
  </button>
)

const AddButton = ({ onClick }) => (
  <button
    className="p-2 transition-all duration-75 transform bg-gray-200 rounded-full hover:bg-gray-100 hover:-rotate-90"
    onClick={onClick}
    disabled={false}
  >
    <AddIcon />
  </button>
)

const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)

/**
 * Things to do:
 * 1. Add the responses in the header somewhere
 * 2. Make sure that the question editor is at least center aligned, or more on the top than the bottom
 * 3. Make the properties editor functional with the state
 * 4. Write a mutation query that updates the question
 * 5. Write the api function to actually run the update
 * 6. Create the proper components for these
 * 7. After everything, add an alert to show the unsaved changes :)
 */
