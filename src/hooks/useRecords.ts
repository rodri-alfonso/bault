import { useState, useEffect } from 'react'
import { getRecordById, getRecords } from '@/services/records'
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
      .catch((error) => {
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
      .catch((error) => {
        setError(true)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!records) fetchRecords()
    if (!records && id) fetchRecord()
    if (records && id) {
      const currentRecord = records.find((record: any) => record.id === id)
      setRecord(currentRecord)
      setIsLoading(false)
    }
  }, [])

  return { records, record, isLoading, error, refetch: fetchRecords }
}
