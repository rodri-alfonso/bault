import { useEffect, useState } from 'react'
import { authStore } from '@/stores/auth'
import { auth } from '@/firebase'
import { encrypt } from '@/lib/encryption'
import { User } from '@/stores/types'

export default function useAuthState() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user

        const payload = {
          id: uid,
          name: encrypt(displayName ?? ''),
          email: encrypt(email ?? ''),
          picture: encrypt(photoURL ?? ''),
        } as User

        authStore.setState({ user: payload })
        setLoading(false)
      }
    })
  }, [])

  return { loading }
}
