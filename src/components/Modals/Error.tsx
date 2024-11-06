import Button from '@/theme/Button'
import Modal from '@/theme/Modal'

interface Props {
  isVisible: boolean
  onClose: () => void
  title?: string
  message?: string
  onConfirm?: () => void
  confirmText: string
  closable?: boolean
}

export default function ModalError({ isVisible, onClose, confirmText, message, onConfirm, title }: Props) {
  return (
    <Modal isVisible={isVisible}>
      <div className='flex flex-col gap-6 rounded-2xl bg-white p-6 m-4 max-w-sm'>
        <div className='text-center grid gap-2'>
          <h1 className='text-lg font-semibold text-gray-800'>{title}</h1>
          <p className='text-gray-600'>{message}</p>
        </div>

        <Button
          onClick={() => {
            onConfirm && onConfirm()
            onClose()
          }}
          label={confirmText}
        />
      </div>
    </Modal>
  )
}
