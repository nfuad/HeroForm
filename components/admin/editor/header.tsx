import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import axios from 'axios'
import { LoadingIcon } from '@components/icons'
import { PARAMS } from '@constants/params'
import { BackIcon, SaveIcon, EditIcon } from '@components/icons'

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

const EditableFormName = ({ currentName }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('')
  const { mutate: updateMetadata, isLoading } = useMutation(
    ({ title, id }: any) =>
      axios.post(ROUTES.API.UPDATE_FORM_TITLE, { title, id }),
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
    <h1 className="flex items-center justify-center text-lg gap-x-2">
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
  return (
    <p className="flex items-center justify-center py-0 my-0 mr-2 text-center text-gray-700 transition-all duration-75 cursor-pointer max-h-min hover:text-black font-body hover:border-b-2">
      <span className="text-sm">{responseCount} Responses</span>
    </p>
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
      Preview
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

const BackButton = () => {
  const router = useRouter()

  const onClick = () => router.push(ROUTES.DASHBOARD)

  return (
    <button
      className="text-gray-900 transition-all duration-75 cursor-pointer hover:text-gray-700"
      onClick={onClick}
    >
      <BackIcon />
    </button>
  )
}

const EditButton = ({ disabled, onClick }) => (
  <button
    className="text-gray-400 transition-all duration-75 cursor-pointer hover:text-gray-700"
    disabled={disabled}
    onClick={onClick}
  >
    <EditIcon />
  </button>
)
