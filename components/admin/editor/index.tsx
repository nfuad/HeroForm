import { Dispatch, FC, FormEventHandler, SetStateAction, useState } from 'react'
import { createQuestion } from './helpers'
import QuestionTypeSelection from './property-editor/type/question-type-selection'
import Container from './question-editor/container'
import QuestionPrompt from './question-editor/question-prompt'
import QuestionItem from './question-list/question-item'
import { Question, QuestionType } from './types'
import Options from './question-editor/options'
import toast from 'react-hot-toast'
import set from 'lodash.set'
import { AddIcon } from '@components/icons'
import Scheduling from '@components/survey/questions/scheduling'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'

type Props = {
  questions: any
  setQuestions: Dispatch<SetStateAction<Question[]>>
  selectedQuestionID: string
  setSelectedQuestionID: Dispatch<SetStateAction<string>>
  setUnsaved: Dispatch<SetStateAction<boolean>>
  redirectUrl?: string
  webhookUrl?: string
  setRedirectUrl: Dispatch<SetStateAction<string>>
  setWebhookUrl: Dispatch<SetStateAction<string>>
}
const Editor: FC<Props> = ({
  questions,
  setQuestions,
  selectedQuestionID,
  setSelectedQuestionID,
  setUnsaved,
  redirectUrl,
  webhookUrl,
  setWebhookUrl,
  setRedirectUrl,
}) => {
  const router = useRouter()
  const { id: publicId } = router.query as Record<string, string>

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

    setUnsaved(true)
  }

  const handleDelete = () => {
    if (Object.keys(questions).length === 1) {
      toast.error('You must have at least one question.')
      return
    }

    const currentQuestionID = selectedQuestionID
    const currentQuestionOrder = questions[currentQuestionID].properties.order

    setQuestions((prevState) => {
      const newState = { ...prevState }
      delete newState[selectedQuestionID]

      Object.keys(newState).forEach((questionID) => {
        const question = newState[questionID]
        if (question.properties.order > currentQuestionOrder) {
          set(
            newState,
            `${questionID}.properties.order`,
            question.properties.order - 1,
          )
        }
      })

      return newState
    })

    const prevQuestionID = Object.values(questions)
      .filter(
        (question: any) =>
          question.properties.order === currentQuestionOrder - 1,
      )
      .map((question: any) => question.id)[0]

    console.log({ currentQuestionOrder, prevQuestionID })

    setSelectedQuestionID(prevQuestionID)
    setUnsaved(true)
  }

  const renderQuestions = () => {
    return Object.values(questions)
      .sort(
        (a: Question, b: Question) => a.properties.order - b.properties.order,
      )
      .map((question: any, index) => {
        const questionID = question.id
        const selected = selectedQuestionID === questionID
        const handleSelectClick = () => setSelectedQuestionID(questionID)

        return (
          <QuestionItem
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
  const isScheduling =
    questions[selectedQuestionID]?.type === QuestionType.SCHEDULING

  const question = questions[selectedQuestionID]

  const { id, prompt, type, options } = question || {}

  const {
    isRequired,
    isMultipleSelectionAllowed,
    isOtherOptionAllowed,
    isMaxLengthSpecified,
    placeholder,
    maxCharacters,
    order,
    schedulingLink,
  } = question?.properties || {}

  const handleQuestionChange = (key: string, value: any) => {
    setQuestions((prevState) => {
      const copy = { ...prevState }
      const path = `${selectedQuestionID}.${key}`
      set(copy, path, value)
      return copy
    })

    setUnsaved(true)
  }

  const getPlaceholder = (type) => {
    switch (type) {
      case QuestionType.LONG_TEXT:
        return 'Enter text here'

      case QuestionType.SHORT_TEXT:
        return 'Enter text here'

      case QuestionType.MULTI_CHOICE:
        return 'Select an option'

      case QuestionType.SCHEDULING:
        return 'https://calendly.com/your-link'

      default:
        throw new Error(`Unknown question type: ${type}`)
    }
  }

  const handleWebhookURLSave: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    await fetch(ROUTES.API.INTEGRATIONS.WEBHOOK.INDEX, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webhookUrl,
        publicId,
      }),
    })

    toast.success('nice')
  }
  const handleRedirectURLSave: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault()

    await fetch(ROUTES.API.INTEGRATIONS.WEBHOOK.REDIRECT_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        redirectUrl,
        publicId,
      }),
    })

    toast.success('nice')
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
        <form onSubmit={handleWebhookURLSave}>
          <input
            type="text"
            placeholder="Webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <button>Save</button>
        </form>
        <form onSubmit={handleRedirectURLSave}>
          <input
            type="text"
            placeholder="Redirect URL"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
          />
          <button>Save</button>
        </form>
        <Container>
          <QuestionPrompt
            prompt={prompt}
            onChange={(newPrompt: string) =>
              handleQuestionChange('prompt', newPrompt)
            }
          />

          {isShortText && (
            <input
              className="w-full max-w-lg pb-1 mt-12 text-lg transition-all duration-200 ease-in-out bg-transparent border-b-2 border-gray-300 outline-none focus:border-gray-900"
              placeholder={placeholder}
              type="text"
              disabled
            />
          )}
          {isLongText && (
            <div className="flex flex-col items-center justify-center w-full mt-12 gap-y-3">
              <textarea
                className="w-full max-w-lg pb-1 text-lg transition-all duration-200 ease-in-out bg-transparent border-b-2 border-gray-300 outline-none resize-none focus:border-gray-900 h-min"
                placeholder={placeholder}
                rows={1}
                disabled
              />
              <p className="ml-4 text-xs text-center text-gray-600">
                Press <b>Shift ⇧ + Enter ↵</b> for line break
              </p>
            </div>
          )}
          {isMultiChoice && (
            <Options
              options={options}
              setOptions={(newOptions) => {
                handleQuestionChange('options', newOptions)
              }}
            />
          )}
          {isScheduling && <Scheduling properties={question?.properties} />}
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
                onChange={(newType: QuestionType) => {
                  handleQuestionChange('type', newType)
                  handleQuestionChange(
                    'properties.placeholder',
                    getPlaceholder(newType),
                  )
                }}
              />
            </div>
            {(isShortText || isLongText) && (
              <div className="flex flex-col justify-between my-2">
                <label htmlFor={'placeholder'} className="text-sm font-body">
                  Placeholder
                </label>
                <input
                  onChange={(e) =>
                    handleQuestionChange(
                      'properties.placeholder',
                      e.target.value,
                    )
                  }
                  value={placeholder}
                  className="w-full px-2 py-1 mt-2 text-sm border-2 rounded-md"
                  name="placeholder"
                  id="placeholder"
                />
              </div>
            )}
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
            {/* TODO: DO LATER */}
            {/* {isMultiChoice && (
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
            )}
            {isMultiChoice && (
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
            )} */}
            {(isLongText || isShortText) && (
              <div className="flex flex-col items-start justify-between my-2">
                <div className="flex items-center justify-between w-full">
                  <label
                    htmlFor={'max-characters'}
                    className="text-sm font-body"
                  >
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
            )}

            {isScheduling && (
              <div className="flex flex-col justify-between my-2">
                <label
                  htmlFor={'scheduling-link'}
                  className="text-sm font-body"
                >
                  Scheduling Link (Calendly / Cal.com)
                </label>
                <input
                  onChange={(e) =>
                    handleQuestionChange(
                      'properties.schedulingLink',
                      e.target.value,
                    )
                  }
                  value={schedulingLink}
                  placeholder={placeholder}
                  className="w-full px-2 py-1 mt-2 text-sm border-2 rounded-md"
                  name="scheduling-link"
                  id="scheduling-link"
                />
              </div>
            )}
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
