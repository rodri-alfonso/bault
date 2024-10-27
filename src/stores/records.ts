import { create } from 'zustand'

type Store = {
  records: [] | null
  setRecords: (records: []) => void
  record: any | null
  setRecord: (record: any | null) => void
}

export const recordStore = create<Store>()((set) => ({
  records: null,
  setRecords: (records) => set({ records }),
  record: null,
  setRecord: (record) => set({ record }),
}))
