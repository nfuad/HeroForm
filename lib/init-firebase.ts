import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { connectAuthEmulator } from 'firebase/auth'
import { isDevEnv } from '../utils/is-dev-env'
import firebaseConfigJSON from '../firebase.json'

const connectEmulators = ({ auth }) => {
  if (isDevEnv()) {
    connectAuthEmulator(
      auth,
      `http://localhost:${firebaseConfigJSON.emulators.auth.port}`,
    )
  }
}

const firebaseConfig = {
  apiKey: 'AIzaSyA0no2UGDmcxWjToqfmBQwvjph0k5GqLQo',
  authDomain: 'inquire-dev-dbd89.firebaseapp.com',
  projectId: 'inquire-dev-dbd89',
  storageBucket: 'inquire-dev-dbd89.appspot.com',
  messagingSenderId: '537616956281',
  appId: '1:537616956281:web:4100dbfb4c1533ae0c0da8',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

connectEmulators({ auth })

export { app, auth }
