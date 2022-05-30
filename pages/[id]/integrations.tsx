import { useRouter } from 'next/router'

const IntegrationsPage = () => {
  const router = useRouter()
  const id = router.query.id
  const link = `https://slack.com/oauth/v2/authorize?client_id=3588361248899.3581777432486&scope=incoming-webhook,chat:write&state=${id}`

  return (
    <div>
      <a className="text-red-500 border-blue-400 text-3xl" href={link}>
        Click on this gorgeous button to connect slack
      </a>
    </div>
  )
}

export default IntegrationsPage
