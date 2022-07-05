import { auth } from '../lib/init-firebase'
import { signOut } from 'firebase/auth'
import { ROUTES } from '../constants/routes'
import Layout from '@components/layout'
import { Loader } from '@components/loader'
import {
  Authenticated,
  Container,
  UnAuthenticated,
} from '@components/auth-screens'
import { useRouter } from 'next/router'
import { useAuth } from '@lib/auth/provider'

const AuthPage = ({}) => {
  const router = useRouter()
  const {
    user,
    isAuthUnknown,
    isLoggedOut,
    isLoggedIn,
    authenticateWithGoogle,
  } = useAuth()

  const handleContinueClick = () => router.push(ROUTES.DASHBOARD)
  const handleSignOutClick = () => signOut(auth)
  const handleSignInClick = async () => {
    await authenticateWithGoogle()
  }

  return (
    <Layout title="Continue">
      <Container>
        {isAuthUnknown && <Loader />}
        {isLoggedIn && (
          <Authenticated
            handleContinueClick={handleContinueClick}
            handleSignOutClick={handleSignOutClick}
            user={user}
          />
        )}
        {isLoggedOut && (
          <UnAuthenticated handleSignInClick={handleSignInClick} />
        )}
      </Container>
    </Layout>
  )
}

export default AuthPage
