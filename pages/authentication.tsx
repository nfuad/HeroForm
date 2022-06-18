import {
  css,
  Button,
  Text,
  Container,
  Spacer,
  Image,
  Link,
} from '@nextui-org/react'
import { auth } from '../lib/init-firebase'
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from 'firebase/auth'
import NextLink from 'next/link'
import { ROUTES } from '../constants/routes'
import { useRouter } from 'next/router'
import { SITE_DATA } from '@constants/site-data'

const provider = new GoogleAuthProvider()

const GoogleLogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
)

const AuthPage = ({}) => {
  const router = useRouter()

  const handleContinueWithGoogleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const details = getAdditionalUserInfo(result)

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user

        // signing up for the first time ever
        if (details.isNewUser) {
          // await setDoc(doc(db, COLLECTIONS.USERS, user.uid), {
          //   ...JSON.parse(JSON.stringify(user)),
          //   ...JSON.parse(JSON.stringify(details)),
          //   token,
          // })
        }
      })
      .then((res) => {
        router.push(ROUTES.DASHBOARD)
      })
      .catch((error) => {
        // Handle Errors here.
        //   const errorCode = error.code
        //   const errorMessage = error.message
        //   // The email of the user's account used.
        //   const email = error.customData.email
        //   // The AuthCredential type that was used.
        //   const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
        console.log({ error })
      })
  }

  return (
    <Container
      css={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
      xl
      justify="center"
      alignItems="center"
      fluid
    >
      <Image
        width={320 / 1.6}
        height={180 / 1.6}
        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
        alt="Default Image"
        objectFit="cover"
      />
      <Text h1 size="$md">
        Continue to {SITE_DATA.name}
      </Text>
      <Spacer />
      <Button
        shadow
        color="gradient"
        icon={<GoogleLogoIcon />}
        css={{
          paddingLeft: '3rem',
          paddingRight: '3rem',
          fontSize: 13,
          borderRadius: '$xs',

          '&:hover': {
            opacity: 0.9,
          },
        }}
        auto
        onClick={handleContinueWithGoogleClick}
      >
        Continue With Google
      </Button>
      <Spacer y={2} />

      <Spacer y={2} />
      <Container
        css={{
          textAlign: 'center',
          maxWidth: '260px',
        }}
      >
        <Text
          small
          css={{
            textAlign: 'center',
          }}
          color="gray"
        >
          By continuing, you agree to our{' '}
          <NextLink href="/terms">
            <Link color={'secondary'}>Terms of Service</Link>
          </NextLink>{' '}
          and{' '}
          <NextLink href="/privacy">
            <Link color={'secondary'}>Privacy Policy</Link>
          </NextLink>
          .
        </Text>
      </Container>
    </Container>
  )
}

export default AuthPage
