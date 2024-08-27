import { create } from 'zustand'

type Store = {
  isInRegisterCode: boolean
  setIsInRegisterCode: (value: boolean) => void
}

export const registerStore = create<Store>()((set) => ({
  isInRegisterCode: false,
  setIsInRegisterCode: (value: boolean) => set({ isInRegisterCode: value }),
}))
