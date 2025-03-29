import Button from '@/theme/Button'
import { useEffect, useState } from 'react'

import { auth, app, provider } from '@/firebase'

const BASE_URL = 'https://www.googleapis.com'

// client ID: 86480998467-1k8dn3ncptibsdj9604ftkhn11kldhai.apps.googleusercontent.com

// api key: AIzaSyBrnbVbSAQ8HCr4HJYrr6qAPsRu_ZaiSvY

export default function TestPage() {
  const [document, setDocument] = useState('')

  useEffect(() => {
    fetchDocument()
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
