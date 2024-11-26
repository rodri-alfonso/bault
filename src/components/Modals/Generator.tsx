import Modal from '@/theme/Modal'

interface Props {
  isVisible: boolean
  onClose: () => void
  onConfirm?: () => void
}

export default function GeneratorModal({ isVisible, onClose, onConfirm }: Props) {
  return (
    <Modal isVisible={isVisible}>
      <div className='bg-white p-10 rounded-md'>
        <p> Hi! Im the Generator component! </p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  )
}
