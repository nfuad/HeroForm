import { useEffect, useState } from 'react'
import Editor from '@components/admin/editor'
// import Header from '@components/admin/editor/header'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { Container } from '@components/auth-screens'
import { Loader } from '@components/loader'
import toast from 'react-hot-toast'
import Toast from '@components/toast'
import { useMutation } from 'react-query'
import axios from 'axios'
import { ROUTES } from '@constants/routes'
import { PARAMS } from '@constants/params'
import { showConfettiAnimation } from '@lib/show-confetti-animation'
import { LOCAL_STORAGE } from '@constants/local-storage'
import { useAuth } from '@lib/auth/provider'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import BackButton from '@components/back-button'
import { EditableFormName } from '@components/admin/editor/header'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const EditorPage = () => {
  const [unsaved, setUnsaved] = useState(false)
  const [formName, setFormName] = useState('')
  const [questions, setQuestions] = useState({})
  const [selectedQuestionID, setSelectedQuestionID] = useState('')
  const { user } = useAuth()

  const router = useRouter()
  const { id } = router.query
  const {
    data: preloadedFormData,
    isFetching: isFetchingForm,
    isError,
    error,
  }: {
    data: {
      data: {
        publicId: string
        name: string
        questions: any[]
        _count: { responses: number }
      }
    }
    isFetching: boolean
    isError: boolean
    error: Error
  } = useQuery(`${ROUTES.API.GET_FORM}?${PARAMS.ID}=${id}`, {
    refetchOnReconnect: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
    onSuccess({ data }) {
      setQuestions(data.questions)
      const firstQuestionID = Object.keys(data.questions)[0] // need to sort this properly!
      setSelectedQuestionID(firstQuestionID)
      setFormName(data.name)
    },
  })

  const {
    mutate: publishForm,
    isLoading: publishFormLoading,
    isSuccess: publishFormSuccess,
  } = useMutation(
    ({ questions, id }: { questions: any; id: string }) => {
      return axios.post(ROUTES.API.PUBLISH_FORM, {
        questions,
        id,
        email: user?.email,
      })
    },
    {
      onSuccess() {
        setUnsaved(false)
        toast.success('Form published!')
        router.push(`/${id}`)

        showConfettiAnimation()
      },
      onError(error: any) {
        setUnsaved(false) // will let the user close the tab, no need to keep the unsaved state
        console.log({ error })
        toast.error('Could not publish form. Try again later :)')
      },
    },
  )

  const handlePublishClick = () => {
    publishForm({ questions, id: id as string })
  }

  useEffect(() => {
    const handleEvent = (e) => {
      if (unsaved) {
        e.preventDefault()
        e.returnValue =
          'You have unsaved changes. Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleEvent)

    return () => {
      window.removeEventListener('beforeunload', handleEvent)
    }
  }, [unsaved])

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE.QUESTIONS,
      JSON.stringify(Object.values(questions)),
    )
  }, [questions])

  if (isFetchingForm) {
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

  const { data: form } = preloadedFormData || {}
  const { responses: responseCount = 0 } = form?._count || {}

  return (
    <>
      <Header
        publishButtonDisabled={publishFormLoading}
        handlePublishClick={handlePublishClick}
        formName={formName}
        responseCount={responseCount}
        publishFormLoading={publishFormLoading}
      />
      <div className="overflow-hidden bg-slate-50">
        <div className="flex items-center justify-center h-screen lg:hidden">
          <p>Editor is currently unavailable on this viewport.</p>
        </div>
        <div className="flex-col hidden h-screen max-h-screen lg:flex">
          <Editor
            questions={questions}
            setQuestions={setQuestions}
            selectedQuestionID={selectedQuestionID}
            setSelectedQuestionID={setSelectedQuestionID}
            setUnsaved={setUnsaved}
          />
        </div>
      </div>
      <Toast />
    </>
  )
}

export default EditorPage

const Header = () => {
  const auth = useAuth()

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 border-b w-full">
            <div className="flex justify-between h-12">
              <div className="flex-shrink-0 flex justify-center items-center">
                <div className="mr-5 pr-5 border-r">
                  <BackButton route={ROUTES.DASHBOARD} />
                </div>
                <EditableFormName currentName={'formName'} />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <Link href={ROUTES.EDIT}>
                  <a className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Editor
                  </a>
                </Link>
                <Link href={ROUTES.RESPONSES}>
                  <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Responses
                  </a>
                </Link>
                <Link href={ROUTES.SETTINGS}>
                  <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Settings
                  </a>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center gap-x-4">
                <button
                  type="button"
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Publish
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="ml-4 border-l pl-5 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      {auth?.user?.photoURL ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={auth?.user?.photoURL}
                          alt=""
                        />
                      ) : (
                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
