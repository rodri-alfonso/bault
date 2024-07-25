import { db } from '../firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import type { User } from 'stores/types'
import { ENVIRONMENTS } from '../lib/constants'

export const addUserToCollection = async (user: User) => {
	const isUserInCollection = (await getDoc(doc(db, ENVIRONMENTS.FIRESTORE_USK, user.id))).exists()
	if (isUserInCollection) return

	return await setDoc(doc(db, ENVIRONMENTS.FIRESTORE_USK, user.id), user)
}
