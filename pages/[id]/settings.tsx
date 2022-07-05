import Button from '@components/button'
import { BackIcon } from '@components/icons'
import { Loader } from '@components/loader'
import Toast from '@components/toast'
import { ROUTES } from '@constants/routes'
import { useAuth } from '@lib/auth/provider'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import Image from 'next/image'
import BackButton from '@components/back-button'
import { Container } from '@components/auth-screens'

const IntegrationCard = ({
  img,
  title,
  description,
  isConnected = false,
  handleConnect = () => {},
  isLoading = false,
}) => {
  const getCta = () => {
    if (isLoading) return 'Loading...'
    if (isConnected) return 'Connected'
    return 'Connect'
  }

  return (
    <div className="w-full border bg-white shadow-sm py-5 justify-between items-center flex px-5 max-w-2xl rounded-md">
      <Image src={img} width={50} height={50} alt="" />
      <div>
        <h4>{title}</h4>
        <p className="text-sm max-w-sm">{description}</p>
      </div>
      <Button
        className="text-xs"
        onClick={handleConnect}
        disabled={isLoading || isConnected}
      >
        <span>{getCta()}</span>
      </Button>
    </div>
  )
}

const SheetsIntegrationCard = ({ isConnected = false }) => {
  const router = useRouter()
  const id = router.query.id
  const { refetch, isLoading } = useQuery<
    {
      authUrl: string
    },
    Error
  >(`${ROUTES.API.INTEGRATIONS.SHEETS.LOGIN}?publicFormId=${id}`, {
    enabled: false,
  })

  const handleConnect = async () => {
    const response = await refetch()
    if (!response.isError) {
      const { authUrl } = response.data
      window.location.href = authUrl
    }
  }

  return (
    <IntegrationCard
      isConnected={isConnected}
      title={'Google Sheets'}
      img="/images/sheets.png"
      description={`Connect Sheets to collect responses from everyone and send the data straight to your Google Sheets. Results are always synced automatically!`}
      handleConnect={handleConnect}
      isLoading={isLoading}
    />
  )
}

const SlackIntegrationCard = ({ isConnected = false }) => {
  const router = useRouter()
  const id = router.query.id
  const link = `https://slack.com/oauth/v2/authorize?client_id=3588361248899.3581777432486&scope=incoming-webhook,chat:write&redirect_uri=https://heroform.io/api/slack-oauth&state=${id}`

  const handleConnect = () => (window.location.href = link)

  return (
    <IntegrationCard
      isConnected={isConnected}
      title="Slack"
      img="/images/slack.png"
      description={`Connect Slack to get notified in a channel or direct message when responses are received.`}
      handleConnect={handleConnect}
    />
  )
}

const SettingsPage: NextPage = () => {
  const [redirectUrl, setRedirectUrl] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')

  const router = useRouter()
  const { id } = router.query as Record<string, string>

  const {
    isFetching: isFetchingDeveloperSettings,
    error,
  }: {
    data: {
      data: {
        webhookUrl?: string
        redirectUrl?: string
      }
    }
    isFetching: boolean
    isError: boolean
    error: Error
  } = useQuery(`${ROUTES.API.INTEGRATIONS.WEBHOOK.GET_URLS}?id=${id}`, {
    refetchOnReconnect: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
    onSuccess({ data }) {
      setRedirectUrl(data?.redirectUrl)
      setWebhookUrl(data?.webhookUrl)
    },
  })

  const {
    data: { data: integrationStatus } = {
      data: {
        slack: false,
        sheets: false,
      },
    },
    isFetching: isFetchingIntegrationStatus,
  }: {
    data: {
      data: {
        slack: boolean
        sheets: boolean
      }
    }
    isFetching: boolean
    isError: boolean
    error: Error
  } = useQuery(`${ROUTES.API.INTEGRATIONS.STATUS}?publicFormId=${id}`, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  })

  const { mutate: saveURLs } = useMutation(
    ({
      id,
      webhookUrl,
      redirectUrl,
    }: {
      id: string
      webhookUrl?: string
      redirectUrl?: string
    }) => {
      return axios.post(ROUTES.API.INTEGRATIONS.WEBHOOK.UPDATE_URLS, {
        id,
        webhookUrl,
        redirectUrl,
      })
    },
    {
      onSuccess() {
        toast.success('URLs updated')
      },
      onError(error: any) {
        toast.error('Error saving URLs')
      },
    },
  )

  const handleWebhookUrlChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setWebhookUrl(e.target.value)
  const handleRedirectUrlChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setRedirectUrl(e.target.value)
  const handleSaveURLs: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    saveURLs({
      id,
      webhookUrl,
      redirectUrl,
    })
  }

  if (isFetchingDeveloperSettings || isFetchingIntegrationStatus) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  if (error) return <p>What a tough luck</p>

  return (
    <>
      <div className="overflow-hidden bg-slate-50">
        <div className="flex-col h-screen max-h-screen lg:flex">
          <header className="flex items-center justify-between px-12 py-4 bg-white border-b border-gray-200">
            <div className="flex">
              <div className="flex items-center justify-center border-r border-gray-300 pr-7 mr-7">
                <BackButton />
              </div>
              <h1 className="flex items-center justify-center text-lg gap-x-2">
                Settings
              </h1>
            </div>
          </header>
          <div className="mx-auto w-full max-w-7xl pt-16">
            <h2 className="text-lg mb-3">Integrations</h2>
            <div className="flex flex-col gap-y-5">
              <SheetsIntegrationCard isConnected={integrationStatus.sheets} />
              <SlackIntegrationCard isConnected={integrationStatus.slack} />
            </div>
          </div>
          <div className="mx-auto w-full max-w-7xl pt-16">
            <h2 className="text-lg mb-3">Developer Settings</h2>
            <form
              className="flex flex-col w-full max-w-xl"
              onSubmit={handleSaveURLs}
            >
              <div className="mb-4">
                <h5 className="text-sm">Webhook URL</h5>
                <input
                  className="font-medium w-full py-2 px-3 rounded-md border border-gray-200 focus:outline-none ring-0 ring-blue-300 focus:ring-2 transition"
                  placeholder="https://api.heroform.io/webhook/signup"
                  type="text"
                  value={webhookUrl}
                  onChange={handleWebhookUrlChange}
                />
              </div>
              <div className="mb-16">
                <h5 className="text-sm">Redirect URL</h5>
                <input
                  className="font-medium w-full py-2 px-3 rounded-md border border-gray-200 focus:outline-none ring-0 ring-blue-300 focus:ring-2 transition"
                  placeholder="https://heroform.io/dashboard"
                  type="text"
                  value={redirectUrl}
                  onChange={handleRedirectUrlChange}
                />
              </div>
              <Button className="self-end">Save</Button>
            </form>
          </div>
        </div>
      </div>
      <Toast />
    </>
  )
}

export default SettingsPage
