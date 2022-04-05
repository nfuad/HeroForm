import { NextPage } from 'next'
import Forms from '@components/admin/forms'
import Button from '@components/button'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Container, Loader } from '@components/continue'
import Layout from '@components/layout'
import { ROUTES } from '@constants/routes'
import { GetStartedButton } from '@components/common'
import { ChevronRightIcon } from '@components/icons'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import isEmpty from 'lodash.isempty'
import Link from 'next/link'

const AdminPage: NextPage = () => (
  <Layout isProtected title="Admin">
    <Container>
      <Admin />
    </Container>
  </Layout>
)

export default AdminPage

const Admin = () => {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  const {
    isLoading: getFormsLoading,
    error: getFormsError,
    data: formsData,
  }: { isLoading: boolean; error: Error; data: { forms: any[] } } = useQuery(
    ROUTES.API.GET_FORMS,
    {
      enabled: isAuthenticated,
      onError: () => {
        toast.error('Could not get forms')
      },
    },
  )
  const noExistingForms = !getFormsLoading && isEmpty(formsData?.forms)
  const {
    mutate: createForm,
    isLoading: createFormLoading,
    // isError: createFormError,
    isSuccess: createFormSuccess,
  } = useMutation(() => axios.post(ROUTES.API.CREATE_FORM), {
    onSuccess({ data: { id } }) {
      console.log({ id })
      toast.success('Form created!')
      router.push(`${ROUTES.ADMIN}/${id}`)
    },
    onError(error: any) {
      console.log({ error })
      toast.error('Could not create form. Try again later :)')
    },
  })

  const router = useRouter()

  const handleCreateClick = () => createForm()

  if (getFormsLoading) {
    return (
      <>
        <h1>Loading your forms...</h1>
        <p>Hold tight, this is taking some time 😄</p>
      </>
    )
  }

  if (getFormsError) {
    return (
      <>
        <h1>Oops!</h1>
        <p>Something went wrong while loading forms. Try again later.</p>
      </>
    )
  }

  if (createFormLoading) {
    return (
      <>
        <h1>Creating form...</h1>
        <p>We'll redirect you to the form page</p>
      </>
    )
  }

  if (createFormSuccess) {
    return (
      <>
        <h1>Form created!</h1>
        <p>Redirecting now...</p>
      </>
    )
  }

  if (noExistingForms) {
    return (
      <>
        <h1 className="px-16 mx-auto text-4xl text-center lg:px-0 md:px-24 lg:text-5xl xl:text-6xl">
          You don't have any forms yet. Create One?
        </h1>

        <CreateFirstFormButton
          handleCreateClick={handleCreateClick}
          createFormLoading={createFormLoading}
        />
      </>
    )
  }

  const renderForms = () =>
    formsData?.forms?.map((form) => <Form {...form} key={form.id} />)

  return (
    <>
      <h1 className="my-3 text-xl">Your Forms</h1>
      <div className="flex flex-wrap gap-x-6 max-w-7xl gap-y-7">
        {renderForms()}

        <AddFormButton
          handleCreateClick={handleCreateClick}
          createFormLoading={createFormLoading}
        />
      </div>
    </>
  )
}

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

const Form = ({ id, name }) => {
  const href = `/admin/${id}`
  return (
    <Link href={href}>
      <a className="flex flex-col items-center justify-center w-32 h-40 text-sm text-center transition-shadow rounded-md shadow-md cursor-pointer hover:shadow-xl">
        <h1>{name}</h1>
      </a>
    </Link>
  )
}

const AddFormButton = ({ handleCreateClick, createFormLoading }) => {
  return (
    <button
      className="w-32 h-40 text-indigo-900 bg-orange-100 rounded-md shadow-md font-heading"
      onClick={handleCreateClick}
      disabled={createFormLoading}
    >
      + Add Form
    </button>
  )
}
