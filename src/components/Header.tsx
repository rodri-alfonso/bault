import { signOut } from '../stores/auth'
import { authStore } from '../stores/auth'
import { MenuSquareIcon } from '@/assets/icons'
import { useLocation } from 'wouter'
import { ArrowRightIcon, DeleteIcon } from '@/assets/icons'
import { useState } from 'react'
import { deleteRecord } from '@/services/records'
import ConfirmModal from './Modals/Confirm'

interface IconButtonProps {
  children: React.ReactNode | React.ReactNode[]
  onClick: () => void
}

export default function Header() {
  const { user } = authStore()
  const [location, navigation] = useLocation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isCreatorPath = location === '/create'
  const isRecordPath = location.includes('record/')

  const IconButton = ({ children, onClick }: IconButtonProps) => {
    return (
      <button
        onClick={onClick}
        className='text-gray-500 p-2 bg-gray-50 rounded-lg hover:text-gray-800 hover:bg-gray-100 active:scale-95 transition-all'
      >
        {children}
      </button>
    )
  }

  function handleLogout() {
    signOut()
    setIsModalVisible(false)
  }

  function handleDelete() {
    setIsDeleting(true)
    const locationId = location.split('/')[2]
    deleteRecord(locationId).then(() => navigation('/'))
  }

  return (
    <header className='flex items-center justify-between px-4'>
      {isCreatorPath || isRecordPath ? (
        <button
          className='text-gray-900 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 active:scale-95 transition-all'
          onClick={() => navigation('/')}
        >
          <ArrowRightIcon className='rotate-180' />
        </button>
      ) : (
        <button
          onClick={() => setIsModalVisible(true)}
          className='text-gray-900 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 active:scale-95 transition-all'
        >
          <MenuSquareIcon />
        </button>
      )}

      {!isCreatorPath && !isRecordPath && (
        <img src={user?.picture} alt='' className='rounded-full grid place-items-center w-9 h-9' />
      )}

      {isRecordPath && (
        <section className='flex gap-2'>
          <IconButton onClick={() => setIsDeleteModalVisible(true)}>
            <DeleteIcon />
          </IconButton>
        </section>
      )}

      <ConfirmModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title='Log out of your account?'
        message='You will need to log back in to access your bault.'
        confirmLabel='Log out'
        cancelLabel='Cancel'
        onConfirm={handleLogout}
      />

      <ConfirmModal
        isVisible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        title='Delete record'
        message='Are you sure you want to delete this record?'
        cancelLabel='Cancel'
        onConfirm={handleDelete}
        confirmDisabled={isDeleting}
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        loading={isDeleting}
      />
    </header>
  )
}
