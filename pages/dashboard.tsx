import { NextPage } from 'next'
import Layout from '@components/layout'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Toast from '@components/toast'

import { ROUTES } from '@constants/routes'
import { LoadingIcon } from '@components/icons'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import isEmpty from 'lodash.isempty'
import Link from 'next/link'
import { SITE_DATA } from '@constants/site-data'
import { PlusIcon } from '@components/icons'
import { useAuth } from '@lib/auth/provider'
import {
  ClipboardCopyIcon,
  DotsHorizontalIcon,
  ExternalLinkIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

const DashboardPage: NextPage = () => {
  const { isLoggedIn, isAuthUnknown, user } = useAuth()
  const router = useRouter()

  const {
    isLoading: loadingForms,
    isFetching: fetchingForms,
    error: loadingFormsError,
    data: formsData,
    isSuccess: formsLoaded,
  }: {
    isLoading: boolean
    isFetching: boolean
    error: Error
    data: { forms: any[] }
    isSuccess: boolean
  } = useQuery(`${ROUTES.API.GET_FORMS}?email=${user?.email}`, {
    enabled: isLoggedIn,
    onError: (error) => {
      console.error(error)
      toast.error('Could not get forms')
    },
  })
  const noExistingForms = !loadingForms && isEmpty(formsData?.forms)
  const {
    mutate: createForm,
    isLoading: creatingForm,
    isSuccess: createdForm,
  } = useMutation(
    () =>
      axios.post(ROUTES.API.CREATE_FORM, {
        email: user?.email,
      }),
    {
      onSuccess({ data: { publicId } }) {
        console.log({ publicId })
        toast.success('Form created!')
        router.push(`${publicId}/${ROUTES.EDIT}`)
      },
      onError(error: any) {
        console.log({ error })
        toast.error('Could not create form. Try again later :)')
      },
    },
  )

  const handleCreateClick = () => {
    if (!creatingForm) {
      createForm()
    }
  }

  const renderForms = () =>
    formsData?.forms?.map((form) => <Form {...form} key={form.id} />)

  const getStatusText = () => {
    if (loadingForms) {
      return {
        heading: 'Loading Your Forms 😘',
        body: 'Hold tight, this is taking some time 😅',
      }
    }

    if (loadingFormsError) {
      return {
        heading: 'Oops, Something went wrong 😢',
        body: "We couldn't load your forms, try again later pls?",
      }
    }

    if (formsLoaded && noExistingForms && !creatingForm) {
      return {
        heading: "You don't have any forms yet 😢",
        body: 'Create your first form by clicking the button below',
      }
    }
    if (formsLoaded && !noExistingForms && !creatingForm) {
      return { heading: "Here's Your Forms 👇", body: null }
    }
    if (creatingForm) {
      return {
        heading: 'Creating Form... 😅',
        body: "We'll redirect you to the form editor in a sec.",
      }
    }
    if (createdForm) {
      return {
        heading: 'Form Created! 🎉',
        body: 'Redirecting now...',
      }
    }
    return {
      heading: '',
      body: '',
    }
  }

  return (
    <Layout
      showFooter
      showHeader
      isProtected
      title="Dashboard"
      handleNewFormClick={handleCreateClick}
    >
      <div className="flex flex-col items-start justify-start flex-grow w-full bg-gray-50 px-5 py-10 mx-auto min-h-screen h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center max-w-full xl:flex-row xl:justify-between">
            <h3 className="py-2 text-3xl font-heading">
              {getStatusText().heading}
            </h3>
            {fetchingForms && (
              <div className="flex items-center justify-start">
                <LoadingIcon />
                <span className="ml-2 text-xs">Refreshing...</span>
              </div>
            )}
          </div>
          <div className="flex justify-center w-full xl:justify-start mb-5">
            <p className="text-sm text-gray-500 font-body">
              {getStatusText().body}
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            {!loadingForms && (
              <AddFormButton
                handleCreateClick={handleCreateClick}
                creatingForm={creatingForm}
              />
            )}
            {renderForms()}
          </div>
        </div>
      </div>
      <Toast />
    </Layout>
  )
}

export default DashboardPage

const truncate = (input) => `${input.substring(0, 60)}...`

const Form = ({ publicId, name, _count: { responses: responseCount } }) => {
  const href = `${publicId}${ROUTES.EDIT}`

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`https://${SITE_DATA.domain}/${publicId}`)
      .then(
        () => {
          toast.success('Copied to clipboard!')
        },
        (err) => {
          toast.error('Could not copy to clipboard')
        },
      )
  }

  const router = useRouter()

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="flex w-full bg-white max-w-[140px] min-h-[160px] flex-col items-center justify-between text-sm text-center transition-shadow border border-gray-100 rounded-md shadow-md hover:shadow-xl">
      <div
        onClick={() => {
          router.push(href)
        }}
        className="h-full flex justify-center items-center hover:cursor-pointer p-2"
      >
        <p className="text-clip overflow-hidden">{truncate(name)}</p>
      </div>
      <div className="border-t border-gray-200 w-full py-3 hover:cursor-default flex justify-between items-center px-2">
        <p
          className={`text-xs ${
            responseCount > 0 ? 'text-gray-500' : 'text-gray-300'
          }`}
        >
          {renderResponseCount(responseCount)}
        </p>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                )}
              >
                <DotsHorizontalIcon
                  className={classNames(
                    open ? 'text-gray-600' : 'text-gray-400',
                    'h-5 w-5 group-hover:text-gray-500',
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-[150px] sm:px-0">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-3 sm:py-4 sm:gap-3 text-sm text-gray-900">
                      <button
                        onClick={() => {
                          window.open(`/${publicId}`, '_blank')
                        }}
                        className="flex justify-start items-center hover:text-gray-400 transition-all duration-200 ease-in-out"
                      >
                        <span className="mr-2">View</span>{' '}
                        <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="flex justify-start items-center hover:text-gray-400 transition-all duration-200 ease-in-out"
                      >
                        <span className="mr-2">Copy</span>{' '}
                        <ClipboardCopyIcon className="w-4 h-4 text-gray-500" />{' '}
                      </button>
                      <button
                        onClick={() => {}}
                        className=" flex justify-start items-center text-red-600 hover:text-red-800 border-t border-gray-200 pt-3 transition-all duration-200 ease-in-out"
                      >
                        <span className="mr-2">Delete</span>{' '}
                        <TrashIcon className="w-4 h-4" />{' '}
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

const renderResponseCount = (count: number) => {
  if (count === 0) {
    return 'No responses'
  }
  if (count === 1) {
    return '1 response'
  }
  return `${count} responses`
}

const AddFormButton = ({ handleCreateClick, creatingForm }) => {
  return (
    <button
      className={`flex items-center justify-center max-w-[140px] w-full h-40 bg-white text-indigo-500 transition-all ${
        creatingForm ? 'cursor-not-allowed' : 'hover:shadow-xl'
      } rounded-md shadow-md text-7xl group`}
      onClick={handleCreateClick}
      disabled={creatingForm}
    >
      {creatingForm ? (
        <LoadingIcon />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <span className="transition-all duration-75 group-hover:rotate-12 transform-gpu">
            <PlusIcon />
          </span>
          <p className="text-sm font-bold mt-2">New Form</p>
        </div>
      )}
    </button>
  )
}
