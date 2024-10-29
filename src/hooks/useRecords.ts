import { useState, useEffect } from 'react'
import { getRecordById, getRecords, RegisterWithId } from '@/services/records'
import { recordStore } from '@/stores/records'

export function useRecord(id?: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const { record, setRecord, records, setRecords } = recordStore()

  const fetchRecords = async () => {
    if (!isLoading) setIsLoading(true)

    getRecords()
      .then((response) => {
        setRecords(response)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => setIsLoading(false))
  }

  const fetchRecord = async () => {
    if (!id) return

    getRecordById(id)
      .then((res) => {
        setRecord(res)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!records?.length) fetchRecords()
    if (!records?.length && id) fetchRecord()
    if (records && id) {
      const currentRecord = records.find((record: RegisterWithId) => record.id === id) || null
      setRecord(currentRecord)
      setIsLoading(false)
    }
  }, [])

  return { records, record, isLoading, error, refetch: fetchRecords }
}
