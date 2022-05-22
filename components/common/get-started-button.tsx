import { ROUTES } from '@constants/routes'
import Button from '@components/button'
import { useRouter } from 'next/router'

export const GetStartedButton = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTES.CONTINUE)
  }

  return <Button onClick={handleClick}>Get Started For Free</Button>
}
