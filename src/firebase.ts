import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { ENVIRONMENTS } from './lib/constants'

const firebaseConfig = {
  apiKey: ENVIRONMENTS.FIREBASE_API_KEY,
  authDomain: ENVIRONMENTS.FIREBASE_AUTH_DOMAIN,
  projectId: ENVIRONMENTS.FIREBASE_PROJECT_ID,
  storageBucket: ENVIRONMENTS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENVIRONMENTS.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENVIRONMENTS.FIREBASE_APP_ID,
}

export const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore()
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

provider.addScope('https://www.googleapis.com/auth/drive.file')
provider.addScope('https://www.googleapis.com/auth/drive.metadata.readonly')
