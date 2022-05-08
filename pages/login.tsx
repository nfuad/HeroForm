import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import Layout from '@components/layout'
import {
  Container,
  Authenticated,
  UnAuthenticated,
} from '@components/auth-screens'
import { Loader } from '@components/loader'

const LoginPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  const isUnAuthenticated = status === 'unauthenticated'

  const handleContinueClick = () => router.push(ROUTES.DASHBOARD)
  const handleSignInClick = () =>
    signIn('google', { callbackUrl: ROUTES.DASHBOARD })
  const handleSignOutClick = () => signOut()

  return (
    <Layout title="Continue">
      <Container>
        {isLoading && <Loader />}
        {isAuthenticated && (
          <Authenticated
            handleContinueClick={handleContinueClick}
            session={session}
            handleSignOutClick={handleSignOutClick}
          />
        )}
        {isUnAuthenticated && (
          <UnAuthenticated handleSignInClick={handleSignInClick} />
        )}
      </Container>
    </Layout>
  )
}

export default LoginPage
