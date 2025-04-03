import Button from '@/theme/Button'
import { useEffect, useState } from 'react'
// import { ENVIRONMENTS } from '@/lib/constants'

import { auth } from '@/firebase'

const BASE_URL = 'https://www.googleapis.com'

export default function TestPage() {
  const [document, setDocument] = useState('')

  useEffect(() => {
    fetchDocument()
    console.log(document)
  }, [])

  function fetchDocument() {
    fetch(`${BASE_URL}/drive/v3/about`, {
      headers: {
        Authorization: `Bearer ${auth.currentUser?.getIdToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDocument(data)
      })
  }

  return (
    <div className='bg-white h-screen p-10'>
      <br />
      <Button label='Send docment' />
      <br />
      <Button label='Read the document' />

      <div></div>
    </div>
  )
}
