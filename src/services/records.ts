import { db } from '../firebase'
import { doc, collection, addDoc, getDocs, deleteDoc, getDoc } from 'firebase/firestore'
import type { Register } from 'types'
import { ENVIRONMENTS } from '../lib/constants'
import { getAuthStorage } from '@/lib/storage'

export interface RegisterWithId extends Register {
	id: string
}

const userId = getAuthStorage()?.id || ''

const userRef = doc(collection(db, ENVIRONMENTS.FIRESTORE_USK), userId)
const recordsRef = collection(userRef, ENVIRONMENTS.FIRESTORE_RSK)

export const addRecord = async (record: Register) => await addDoc(recordsRef, record)
export const getRecords = async () =>
	(await getDocs(recordsRef)).docs.map((doc) => ({ ...doc.data(), id: doc.id } as RegisterWithId))
export const deleteRecord = async (id: string) => deleteDoc(doc(recordsRef, id))

export const getRecordById = async (id: string) => {
	const record = await getDoc(doc(recordsRef, id))
	if (record.exists()) {
		return { ...record.data(), id: record.id } as RegisterWithId
	}
	return null
}
