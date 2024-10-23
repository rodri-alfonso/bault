import Modal from '@/theme/Modal'
import Button from '@/theme/Button'

interface Props {
  isVisible: boolean
  onCancel: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  confirmDisabled?: boolean
  loading?: boolean
}

export default function ConfirmModal({
  isVisible,
  onConfirm,
  onCancel,
  cancelLabel = '',
  confirmLabel = '',
  message = '',
  title = '',
  confirmDisabled,
  loading,
}: Props) {
  return (
    <Modal isVisible={isVisible}>
      <div className='flex flex-col gap-6 rounded-2xl bg-white p-6 m-4 max-w-sm'>
        <div className='text-center grid gap-2'>
          <h1 className='text-lg font-semibold text-gray-800'>{title}</h1>
          <p className='text-gray-600'>{message}</p>
        </div>

        <div className='grid gap-2'>
          <Button
            onClick={onConfirm}
            disabled={confirmDisabled}
            loading={loading}
            label={confirmLabel}
            className='bg-red-50 !text-red-400 font-medium border border-solid border-red-400 hover:bg-red-400 hover:!text-white disabled:bg-red-400 disabled:!text-white'
          />

          <Button
            onClick={onCancel}
            label={cancelLabel}
            className='!bg-gray-50 !text-gray-600 font-medium hover:!bg-gray-800 hover:!text-white border border-solid border-gray-300'
          />
        </div>
      </div>
    </Modal>
  )
}
