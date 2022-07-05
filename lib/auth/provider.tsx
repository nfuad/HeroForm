import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../init-firebase'
import { saveUser } from './helpers/save-user'
import * as Sentry from '@sentry/nextjs'
import Router from 'next/router'
import { ROUTES } from '@constants/routes'

enum AuthStatus {
  LOGGED_IN,
  LOGGED_OUT,
  UNKNOWN,
  ERROR,
}
type AuthContextValues = {
  user: User | null
  status: AuthStatus
  error: Error | null
  isProcessing: boolean
  authenticateWithGoogle: () => Promise<void>
}
const AuthContext = createContext<AuthContextValues>({
  user: null,
  status: AuthStatus.UNKNOWN,
  error: null,
  isProcessing: false,
  authenticateWithGoogle: async () => {},
})

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState(AuthStatus.UNKNOWN)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          setStatus(AuthStatus.LOGGED_IN)
          setUser(firebaseUser)
          setError(null)
        } else {
          setStatus(AuthStatus.LOGGED_OUT)
          setUser(null)
          setError(null)
        }
      },
      (error) => {
        setStatus(AuthStatus.ERROR)
        setError(error)
      },
    )

    return () => unsubscribe()
  }, [])

  const authenticateWithGoogle = async () => {
    setIsProcessing(true)

    const provider = new GoogleAuthProvider()

    try {
      const userCredential = await signInWithPopup(auth, provider)
      const { isNewUser } = getAdditionalUserInfo(userCredential)

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(userCredential)
      const { accessToken } = credential

      // The signed-in user info.
      const user = userCredential.user

      await saveUser({
        accessToken,
        isNewUser,
        uid: user.uid,
      })
      Router.push(ROUTES.DASHBOARD)
    } catch (error) {
      // Handle Errors here.
      //   const errorCode = error.code
      //   const errorMessage = error.message
      //   // The email of the user's account used.
      //   const email = error.customData.email
      //   // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
      Sentry.captureException(error)
      console.log({ error })
      setError(error)
      setStatus(AuthStatus.ERROR)
      setIsProcessing(false)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        error,
        isProcessing,
        authenticateWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const { user, status, error, isProcessing, authenticateWithGoogle } =
    useContext(AuthContext)
  const isLoggedIn = status === AuthStatus.LOGGED_IN
  const isLoggedOut = status === AuthStatus.LOGGED_OUT
  const isAuthUnknown = status === AuthStatus.UNKNOWN
  const isError = status === AuthStatus.ERROR

  return {
    user,
    isLoggedIn,
    isLoggedOut,
    isAuthUnknown,
    isError,
    isProcessing,
    error,
    authenticateWithGoogle,
  }
}
