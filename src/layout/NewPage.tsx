import { MenuSquareIcon, PasswordIcon, Bookmark01Icon, FloppyDiskIcon, ArrowRightIcon } from '@/assets/icons'
import { Logo2 } from '@/assets/logo'
import { authStore, signOut } from '@/stores/auth'
import FavouritesModal, { BookmarkedRecord } from '@/components/Modals/Favourites'
import { useState } from 'react'
import ConfirmModal from '@/components/Modals/Confirm'
import { useRecord } from '@/hooks/useRecords'
import { useLocation } from 'wouter'

interface Props {
  children: React.ReactNode
  className?: string
  loadingEditing?: boolean
  disabledEditing?: boolean
  onSaveEditing?: () => void
}

export default function NewPage({ children, disabledEditing, loadingEditing, onSaveEditing }: Props) {
  const { user } = authStore()
  const [isFavouritesModalOpen, setIsFavouritesModalOpen] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { records, refetch } = useRecord()
  const [location, navigation] = useLocation()

  const isRecordPath = location.includes('record/')

  function handleLogout() {
    signOut()
    setIsModalVisible(false)
  }

  return (
    <main className='grid place-items-center h-screen w-full relative px-4 bg-[url("/waves.svg")]'>
      <div className='bg-gray-800 p-2.5 rounded-[32px] flex md:min-w-[61.3rem]'>
        <div className='flex flex-col items-center py-5 ml-2 mr-4 justify-between'>
          <button
            onClick={() => navigation('/')}
            className=' text-gray-800 bg-white p-1.5 rounded-xl grid place-items-center active:scale-95 transition-all'
          >
            {isRecordPath ? <ArrowRightIcon className='w-7 h-7 rotate-180' /> : <Logo2 className='w-7 h-7' />}
          </button>
          <div className='grid gap-3'>
            <button
              onClick={() => setIsModalVisible(true)}
              className='text-gray-300 p-2 bg-gray-700 hover:text-white rounded-xl hover:bg-gray-600 active:scale-95 transition-all'
            >
              <MenuSquareIcon />
            </button>
            <button className='text-gray-300 p-2 bg-gray-700 hover:text-white rounded-xl hover:bg-gray-600 active:scale-95 transition-all'>
              <PasswordIcon />
            </button>

            {isRecordPath ? (
              <button
                onClick={onSaveEditing}
                className='text-gray-800 p-2 bg-white rounded-xl  active:scale-95 transition-all
              disabled:opacity-50 disabled:scale-100 disabled:hover:bg-gray-700 disabled:bg-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed
              '
                disabled={disabledEditing}
              >
                {loadingEditing ? (
                  <svg
                    aria-hidden='true'
                    className='w-6 h-6 text-gray-200 animate-spin fill-gray-800'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                ) : (
                  <FloppyDiskIcon />
                )}
              </button>
            ) : (
              <button
                onClick={() => setIsFavouritesModalOpen(true)}
                className='text-gray-300 p-2 bg-gray-700 hover:text-white rounded-xl hover:bg-gray-600 active:scale-95 transition-all'
              >
                <Bookmark01Icon />
              </button>
            )}
          </div>
          <img
            src={user?.picture}
            alt=''
            className='rounded-full grid place-items-center w-9 h-9 border-solid border border-gray-300'
          />
        </div>
        <section
          className={`bg-white md:h-[600px] md:w-full md:max-w-4xl rounded-3xl flex flex-col gap-4 pt-6 pb-4 md:pb-2 md:pt-3 md:pl-2`}
        >
          {children}
        </section>
      </div>
      <FavouritesModal
        isVisible={isFavouritesModalOpen}
        onCancel={() => setIsFavouritesModalOpen(false)}
        onConfirm={refetch}
        records={(records as BookmarkedRecord[]) || []}
      />
      <ConfirmModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title='Log out of your account?'
        message='You will need to log back in to access your bault.'
        confirmLabel='Log out'
        cancelLabel='Cancel'
        onConfirm={handleLogout}
      />
    </main>
  )
}
