import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import axios from 'axios'
import { LoadingIcon } from '@components/icons'
import { PARAMS } from '@constants/params'
import { BackIcon, SaveIcon, EditIcon } from '@components/icons'
import { useAuth } from '@lib/auth/provider'
import Link from 'next/link'
import BackButton from '@components/back-button'

type Props = {
  handlePublishClick: () => void
  publishButtonDisabled: boolean
  formName: string
  responseCount: number
  publishFormLoading: boolean
}

const Header: FC<Props> = ({
  handlePublishClick,
  publishButtonDisabled,
  formName = 'Untitled',
  responseCount,
  publishFormLoading,
}) => {
  return (
    <header className="flex items-center justify-between px-12 py-4 bg-white border-b border-gray-200">
      <div className="flex">
        <div className="flex items-center justify-center border-r border-gray-300 pr-7 mr-7">
          <BackButton />
        </div>
        <EditableFormName currentName={formName} />
      </div>
      <div className="flex gap-x-3">
        <ViewResponses responseCount={responseCount} />
        <Settings />
        <Insights />
        <PreviewButton processing={publishFormLoading} />
        <PublishButton
          processing={publishFormLoading}
          disabled={publishButtonDisabled}
          onClick={handlePublishClick}
        />
      </div>
    </header>
  )
}

export default Header

const Insights = () => {
  const router = useRouter()
  const href = `/${router.query.id}${ROUTES.INSIGHTS}`

  return (
    <Link href={href}>
      <a className="flex items-center justify-center py-0 my-0 mr-2 text-center text-gray-700 transition-all duration-75 cursor-pointer max-h-min hover:text-black font-body hover:border-b-2">
        Insights
      </a>
    </Link>
  )
}

const Settings = () => {
  const router = useRouter()
  const href = `/${router.query.id}${ROUTES.SETTINGS}`

  return (
    <Link href={href}>
      <a className="flex items-center justify-center py-0 my-0 mr-2 text-center text-gray-700 transition-all duration-75 cursor-pointer max-h-min hover:text-black font-body hover:border-b-2">
        <span className="text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </a>
    </Link>
  )
}

export const EditableFormName = ({ currentName }) => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('')
  const { mutate: updateMetadata, isLoading } = useMutation(
    ({ title, id }: any) =>
      axios.post(ROUTES.API.UPDATE_FORM_TITLE, {
        title,
        id,
        email: user?.email,
      }),
    {
      onSuccess() {
        toast.success('Form Name Updated!')
        setIsEditing(false)
      },
      onError() {
        toast.error('Tough luck, need better internet')
        setIsEditing(false)
      },
    },
  )
  const router = useRouter()

  useEffect(() => {
    setValue(currentName)
  }, [currentName])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave()
    }
  }

  const handleSave = () => updateMetadata({ title: value, id: router.query.id })

  const handleEditButtonClick = () => setIsEditing(true)

  const handleSaveButtonClick = () => handleSave()

  return (
    <h1 className="flex items-center justify-center text-base gap-x-2 mb-[3px]">
      {isEditing ? (
        <>
          <input
            value={value}
            onChange={handleChange}
            type="text"
            minLength={1}
            maxLength={50}
            className="w-full px-1 border-2 border-gray-300 rounded-md"
            onKeyDown={handleKeyDown}
          />
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <SaveButton disabled={false} onClick={handleSaveButtonClick} />
          )}
        </>
      ) : (
        <>
          <span>{value}</span>
          <EditButton disabled={false} onClick={handleEditButtonClick} />
        </>
      )}
    </h1>
  )
}

const ViewResponses = ({ responseCount }) => {
  const router = useRouter()
  const href = `/${router.query.id}${ROUTES.RESPONSES}`

  return (
    <Link href={href}>
      <a className="flex items-center justify-center py-0 my-0 mr-2 text-center text-gray-700 transition-all duration-75 cursor-pointer max-h-min hover:text-black font-body hover:border-b-2">
        <span className="text-sm">{responseCount} Responses</span>
      </a>
    </Link>
  )
}
const PreviewButton = ({ processing }) => {
  const router = useRouter()
  const { id } = router.query as Record<string, string>

  const handlePreviewClick = () => {
    window.open(`/${id}?${PARAMS.PREVIEW}=true`, '_blank', 'noopener')
  }

  return (
    <button
      disabled={processing}
      className={`px-4 py-2 text-sm tracking-wide text-black transition-all duration-75 bg-white border rounded-md shadow-sm hover:text-violet-800 font-heading hover:shadow-lg ${
        processing
          ? 'cursor-not-allowed bg-gray-100 text-gray-500 hover:text-gray-500 hover:shadow-none'
          : ''
      }`}
      onClick={handlePreviewClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

const PublishButton = ({ disabled, onClick, processing }) => (
  <button
    className={`px-4 py-2 text-sm tracking-wide text-white transition-all duration-75 rounded-md shadow-sm  font-heading hover:shadow-lg ${
      disabled || processing
        ? 'bg-violet-300 cursor-not-allowed hover:shadow-none'
        : 'bg-violet-700 hover:bg-violet-900'
    }`}
    disabled={disabled || processing}
    onClick={onClick}
  >
    Publish{processing ? 'ing...' : ' '}
  </button>
)

const SaveButton = ({ disabled, onClick }) => (
  <button
    className="text-green-500 transition-all duration-75 cursor-pointer hover:text-green-700"
    disabled={disabled}
    onClick={onClick}
  >
    <SaveIcon />
  </button>
)

const EditButton = ({ disabled, onClick }) => (
  <button
    className="text-gray-400 transition-all duration-75 cursor-pointer hover:text-gray-700"
    disabled={disabled}
    onClick={onClick}
  >
    <EditIcon />
  </button>
)
