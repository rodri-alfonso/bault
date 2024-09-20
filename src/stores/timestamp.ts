import { create } from 'zustand'
import { setExpirationStorage, getExpirationStorage } from '@/lib/storage'

type Store = {
  timestamp: number
  setTimestamp: () => void
  isProtected: boolean
  setIsProtected: (value: boolean) => void
}

export const timestampStore = create<Store>()((set) => ({
  timestamp: getExpirationStorage(),
  setTimestamp: () =>
    set(() => {
      const timestamp = new Date().getTime()
      setExpirationStorage(timestamp)

      return { timestamp: timestamp }
    }),
  isProtected: true,
  setIsProtected: (value: boolean) => set({ isProtected: value }),
}))
