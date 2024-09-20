import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ENVIRONMENTS } from '../lib/constants'
import { encrypt, decrypt } from '@/lib/encryption'

export const isSecureMatch = async (userId: string, code: string): Promise<boolean> => {
  if (!userId) return false

  const user = (await getDoc(doc(db, ENVIRONMENTS.FIRESTORE_USK, userId))).data()

  const decryptedCode = decrypt(user?.code)

  return code === decryptedCode
}

export const setSecureCode = async (userId: string, code: string) => {
  if (!userId) return

  const docRef = doc(db, ENVIRONMENTS.FIRESTORE_USK, userId)

  await setDoc(docRef, { code: encrypt(code) })
}

export const getSecureCode = async (userId: string) => {
  if (!userId) return

  const user = (await getDoc(doc(db, ENVIRONMENTS.FIRESTORE_USK, userId))).data()

  return user?.code
}
