import { useEffect, useState } from 'react'
import { getSecureCode } from '@/services/security'
import { authStore } from '@/stores/auth'

export function useSecure() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasCode, setHasCode] = useState(false)
  const { user } = authStore()

  useEffect(() => {
    setIsLoading(true)
    getSecureCode(user?.id || '')
      .then((code) => {
        if (code) setHasCode(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [user])

  return { isLoading, hasCode }
}
