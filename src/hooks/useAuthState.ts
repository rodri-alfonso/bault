import { useEffect, useState } from 'react'
import { authStore } from '@/stores/auth'
import { auth } from '@/firebase'
import { User } from '@/stores/types'

export default function useAuthState() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user

        const payload = {
          id: uid,
          name: displayName,
          picture: photoURL,
        } as User

        authStore.setState({ user: payload })
      }
      setLoading(false)
    })
  }, [])

  return { loading }
}
