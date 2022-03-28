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
import { useEffect, useState } from 'react'
import { useForms } from '@components/admin/forms/use-forms'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'

const AdminPage: NextPage = () => {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const {
    isLoading: getFormsLoading,
    error: getFormsError,
    data: formsData,
  } = useQuery(ROUTES.API.GET_FORMS, {
    enabled: isAuthenticated,
    onError: () => {
      toast.error('Could not get forms')
    },
  })
  console.log({ getFormsLoading, getFormsError, formsData })
  const {
    mutate: createForm,
    isLoading: createFormLoading,
    isError: createFormError,
  } = useMutation(() => axios.post(ROUTES.API.CREATE_FORM), {
    onSuccess(data: any) {
      toast.success('Form created!')
      const { id } = data
      router.push(`${ROUTES.ADMIN}/${id}`)
    },
    onError(error: any) {
      console.log({ error })
      toast.error('Could not create form')
    },
  })
  // const {} = useMutation(createForm, {})
  // console.log({ isLoading, error, data })
  // enum State {
  //   Idle,
  //   Processing,
  //   Success,
  //   Error,
  // }
  // const { forms, loading: formsLoading, error: formsError } = useForms()
  // const [status, setStatus] = useState(State.Idle)
  // const isIdle = State.Idle
  // const isError = State.Error
  // const isSuccess = State.Success
  // const isProcessing = State.Processing
  const router = useRouter()

  // const handleCreateClick = async () => {
  //   try {
  //     setStatus(State.Processing)
  //     const response = await fetch('/api/create-form', {
  //       method: 'POST',
  //     })
  //     const data = await response.json()
  //     toast.success('Form created!')

  //     const { id } = data
  //     router.push(`/admin/${id}`)
  //   } catch (error) {
  //     toast.error('Failed to create form')
  //   }
  // }

  // useEffect(() => {}, [status])

  // <div className="flex flex-col p-8 gap-y-12">
  //   <Button className="self-end" onClick={handleCreate}>
  //     + Create Form
  //   </Button>
  //   <Forms />
  // </div>
  // console.log({ forms, formsLoading, formsError })

  const handleCreateClick = () => createForm()

  return (
    <Layout isProtected title="Admin">
      <Container>
        <h1 className="px-16 mx-auto text-4xl text-center md:px-24 md:text-7xl">
          You don't have any forms yet. Create One?
        </h1>

        <button
          onClick={handleCreateClick}
          className="flex items-center justify-center mx-auto my-4 text-lg tracking-wide text-center text-indigo-600 xl:my-10 hover:text-indigo-900 xl:text-4xl font-heading group"
        >
          <span className="transition-all duration-75 group-hover:mr-2">
            Continue
          </span>
          <ChevronRightIcon className="w-9 h-9" strokeWidth={4} />
        </button>
      </Container>
    </Layout>
  )
}

export default AdminPage
