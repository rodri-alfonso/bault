import Modal from '@/theme/Modal'
import Button from '@/theme/Button'
import { PlusIcon } from '@/assets/icons'
import RecordBookmark from '../RecordBookmark'
import { Register } from '@/types'
import { useEffect, useState } from 'react'
import { editRecord } from '@/services/records'

export interface BookmarkedRecord extends Register {
  id: string
}

interface Props {
  isVisible: boolean
  onCancel: () => void
  onConfirm: () => Promise<void>
  records: BookmarkedRecord[]
}

export default function FavouritesModal({ isVisible, onConfirm, onCancel, records }: Props) {
  const [markedRecords, setMarkedRecords] = useState([] as Array<Register & { id: string }>)
  const [isMarkChanged, setIsMarkChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMarkedRecords(records)
  }, [records])

  function handleBookmark(id: string) {
    const updatedRecords = markedRecords.map((record) => ({
      ...record,
      marked: record.id === id ? !record.marked : record.marked,
    }))

    setMarkedRecords(updatedRecords)
    setIsMarkChanged(true)
    editRecord(
      id,
      updatedRecords.find((record) => record.id === id)
    )
  }

  function handleSaveBookmark() {
    setIsLoading(true)

    onConfirm().finally(() => {
      setIsLoading(false)
      onCancel()
      setMarkedRecords(records)
      setIsMarkChanged(false)
    })
  }

  return (
    <Modal isVisible={isVisible}>
      <div className='flex flex-col gap-4 rounded-2xl bg-white p-6 m-4 relative '>
        <button
          onClick={() => {
            onCancel(), setMarkedRecords(records), setIsMarkChanged(false)
          }}
          className='absolute top-3 right-3 hover:bg-gray-100 p-1 rounded-md text-gray-500 bg-gray-50 active:scale-95 transition-all'
        >
          <PlusIcon className='rotate-45' />
        </button>
        <div className='text-center grid gap-2'>
          <h1 className='text-lg font-semibold text-gray-800'>Bookmarks</h1>
          <p className='text-gray-600'>Choose your bookmarks</p>
        </div>

        <section className='grid gap-4 h-64 overflow-y-scroll pb-4'>
          {markedRecords.map((record) => (
            <RecordBookmark record={record} onSelect={handleBookmark} key={record.id} />
          ))}
        </section>

        <Button
          label={isLoading ? 'Saving...' : 'Save'}
          onClick={handleSaveBookmark}
          disabled={!isMarkChanged || isLoading}
          loading={isLoading}
        />
      </div>
    </Modal>
  )
}
