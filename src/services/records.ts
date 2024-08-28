import { db } from '../firebase'
import { doc, collection, addDoc, getDocs, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
import type { Register } from 'types'
import { ENVIRONMENTS } from '../lib/constants'
import { authStore } from '@/stores/auth'

export interface RegisterWithId extends Register {
  id?: string
}

export const addRecord = async (record: Register) => {
  const userRef = doc(collection(db, ENVIRONMENTS.FIRESTORE_USK), authStore.getState().user?.id)
  const recordsRef = collection(userRef, ENVIRONMENTS.FIRESTORE_RSK)

  return await addDoc(recordsRef, record)
}

export const getRecords = async () => {
  const userRef = doc(collection(db, ENVIRONMENTS.FIRESTORE_USK), authStore.getState().user?.id)
  const recordsRef = collection(userRef, ENVIRONMENTS.FIRESTORE_RSK)

  return (await getDocs(recordsRef)).docs.map((doc) => ({ ...doc.data(), id: doc.id } as RegisterWithId))
}

export const deleteRecord = async (id: string) => {
  const userRef = doc(collection(db, ENVIRONMENTS.FIRESTORE_USK), authStore.getState().user?.id)
  const recordsRef = collection(userRef, ENVIRONMENTS.FIRESTORE_RSK)
  return deleteDoc(doc(recordsRef, id))
}

export const getRecordById = async (id: string) => {
  const userRef = doc(collection(db, ENVIRONMENTS.FIRESTORE_USK), authStore.getState().user?.id)
  const recordsRef = collection(userRef, ENVIRONMENTS.FIRESTORE_RSK)

  const record = await getDoc(doc(recordsRef, id))
  if (record.exists()) {
    return { ...record.data(), id: record.id } as RegisterWithId
  }
  return null
}
export const editRecord = async (recordId: string, record: any) => {
  const userRef = doc(collection(db, ENVIRONMENTS.FIRESTORE_USK), authStore.getState().user?.id)
  const recordsRef = collection(userRef, ENVIRONMENTS.FIRESTORE_RSK)

  await updateDoc(doc(recordsRef, recordId), record)
}
