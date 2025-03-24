import Button from '@/theme/Button'
import { useEffect, useState } from 'react'

export default function TestPage() {
  //   const [document, setDocument] = useState('')

  //   useEffect(()=>{
  //     fetchDocument()
  //   },[])

  function fetchDocument() {}

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
