import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  isVisible: boolean
  onClose: () => void
  isEphemeral?: boolean
  lifetime?: number
  message: string
}

export default function Alert({ message, isVisible, onClose, isEphemeral, lifetime = 1000 }: Props) {
  useEffect(() => {
    if (isEphemeral) {
      const timeout = setTimeout(() => {
        onClose()
      }, lifetime)

      return () => clearTimeout(timeout)
    }
  }, [isVisible])

  if (!isVisible) return null

  const alertRoot = document.getElementById('modal-root') as DocumentFragment | Element

  return createPortal(
    <div className='absolute top-0 w-full text-white bg-transparent font-medium pt-6 grid place-items-center -z-10 transition-all'>
      <span className='bg-gray-800 p-2 rounded-lg '>{message}</span>
    </div>,
    alertRoot
  )
}
