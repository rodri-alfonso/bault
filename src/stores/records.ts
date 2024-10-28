import { create } from 'zustand'
import type { RegisterWithId } from '@/services/records'

type Store = {
  records: RegisterWithId[] | null
  setRecords: (records: RegisterWithId[]) => void
  record: RegisterWithId | null
  setRecord: (record: RegisterWithId | null) => void
}

export const recordStore = create<Store>()((set) => ({
  records: null,
  setRecords: (records) => set({ records }),
  record: null,
  setRecord: (record) => set({ record }),
}))
