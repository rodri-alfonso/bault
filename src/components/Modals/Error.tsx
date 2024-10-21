import Modal from '@/theme/Modal'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export default function ModalError({ isVisible, onClose }: Props) {
  return (
    <Modal isVisible={isVisible}>
      <div className='flex flex-col gap-4 bg-white p-4 rounded-xl'>
        <h1 className='text-xl font-semibold'>Error</h1>
        <p className='text-sm'>There's an error</p>
        <div className='flex gap-4'>
          <button onClick={onClose} className='text-sm text-gray-500'>
            Cancel
          </button>
          <button onClick={onClose} className='text-sm text-red-500'>
            Logout
          </button>
        </div>
      </div>
    </Modal>
  )
}
