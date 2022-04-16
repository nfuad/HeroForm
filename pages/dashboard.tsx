import { NextPage } from 'next'
import { Container, Loader } from '@components/continue'
import Layout from '@components/layout'

const DashboardPage: NextPage = () => {
  const { data, status } = useSession()
  const router = useRouter()
  const isAuthenticated = status === 'authenticated'

  const {
    isFetching: fetchingForms,
    error: fetchFormsError,
    data: formsData,
    isSuccess: formsLoaded,
  }: {
    isFetching: boolean
    error: Error
    data: { forms: any[] }
    isSuccess: boolean
  } = useQuery(ROUTES.API.GET_FORMS, {
    enabled: isAuthenticated,
    onError: () => {
      toast.error('Could not get forms')
    },
  })
  const noExistingForms = !fetchingForms && isEmpty(formsData?.forms)
  const {
    mutate: createForm,
    isLoading: creatingForm,
    isSuccess: createdForm,
  } = useMutation(() => axios.post(ROUTES.API.CREATE_FORM), {
    onSuccess({ data: { publicId } }) {
      console.log({ publicId })
      toast.success('Form created!')
      router.push(`${publicId}/${ROUTES.EDITOR}`)
    },
    onError(error: any) {
      console.log({ error })
      toast.error('Could not create form. Try again later :)')
    },
  })

  const handleCreateClick = () => createForm()

  const renderForms = () =>
    formsData?.forms?.map((form) => <Form {...form} key={form.id} />)

  const getStatusText = () => {
    if (fetchingForms) {
      return {
        heading: 'Loading Your Forms 😘',
        body: 'Hold tight, this is taking some time 😅',
      }
    }

    if (fetchFormsError) {
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

  // todo: redo the screen here for no forms.
  return (
    <Layout showFooter showHeader isProtected title="Dashboard">
      <div className="flex flex-col items-start justify-start flex-grow w-full px-5 mx-auto my-20 overflow-hidden max-w-7xl">
        <h2 className="mb-10 text-xl text-gray-700">
          Welcome, {data?.user?.name}&nbsp;&nbsp;🎉
        </h2>
        <div>
          <h3 className="py-2 text-3xl font-heading">
            {getStatusText().heading}
          </h3>
          <div className="h-2">
            <p className="text-sm text-gray-500 font-body">
              {getStatusText().body}
            </p>
          </div>
          <div className="flex flex-wrap my-16 space-evenly gap-x-9 gap-y-9">
            {renderForms()}
            <AddFormButton
              handleCreateClick={handleCreateClick}
              creatingForm={creatingForm}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage

import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { ROUTES } from '@constants/routes'
import { ChevronRightIcon, LoadingIcon } from '@components/icons'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import isEmpty from 'lodash.isempty'
import Link from 'next/link'

const CreateFirstFormButton = ({ handleCreateClick, createFormLoading }) => {
  return (
    <button
      onClick={handleCreateClick}
      className="flex items-center justify-center mx-auto my-4 text-lg tracking-wide text-center text-indigo-600 xl:my-10 hover:text-indigo-900 sm:text-2xl xl:text-4xl font-heading group"
      disabled={createFormLoading}
    >
      <span className="transition-all duration-75 group-hover:mr-2">
        Continue
      </span>
      <ChevronRightIcon
        className="w-5 h-5 md:w-6 md:h-6 lg:w-9 lg:h-9"
        strokeWidth={4}
      />
    </button>
  )
}

const Form = ({ publicId, metadata: { title, responseCount } }) => {
  const href = `${publicId}${ROUTES.EDITOR}`
  return (
    <Link href={href}>
      <a className="flex flex-col items-center justify-center w-32 h-40 text-sm text-center transition-shadow rounded-md shadow-md cursor-pointer hover:shadow-xl">
        <h1>{title}</h1>
        <p className="mt-2 text-xs text-gray-500">
          {responseCount} response{responseCount > 1 && 's'}
        </p>
      </a>
    </Link>
  )
}

const AddFormButton = ({ handleCreateClick, creatingForm }) => {
  return (
    <button
      className={`flex items-center justify-center w-32 h-40 text-indigo-900 transition-all ${
        creatingForm
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-gray-100 hover:shadow-xl'
      } rounded-md shadow-md text-7xl group`}
      onClick={handleCreateClick}
      disabled={creatingForm}
    >
      {creatingForm ? (
        <LoadingIcon />
      ) : (
        <span className="transition-all duration-75 group-hover:rotate-12 transform-gpu">
          <PlusIcon />
        </span>
      )}
    </button>
  )
}

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)
