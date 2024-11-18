import { MenuSquareIcon, PasswordIcon, Bookmark01Icon } from '@/assets/icons'
import { Logo2 } from '@/assets/logo'
import { authStore, signOut } from '@/stores/auth'
import FavouritesModal, { BookmarkedRecord } from '@/components/Modals/Favourites'
import { useState } from 'react'
import ConfirmModal from '@/components/Modals/Confirm'
// import Brand from '@/components/Brand'
// import Footer from '@/components/Footer'

interface Props {
  children: React.ReactNode
  className?: string
  records: BookmarkedRecord[]
  onConfirmModal: () => Promise<void>
}

export default function NewPage({ children, className, records, onConfirmModal }: Props) {
  const { user } = authStore()
  const [isFavouritesModalOpen, setIsFavouritesModalOpen] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleLogout() {
    signOut()
    setIsModalVisible(false)
  }

  return (
    <main className='grid place-items-center h-screen w-full relative px-4'>
      {/* <Brand /> */}
      <div className='bg-gray-800 p-2.5 rounded-[32px] flex'>
        <div className='flex flex-col items-center py-5 ml-2 mr-4 justify-between'>
          <button className=' text-gray-800 bg-white p-1.5 rounded-xl grid place-items-center active:scale-95 transition-all'>
            <Logo2 className='w-7 h-7' />
          </button>
          {/* <img
            src={user?.picture}
            alt=''
            className='rounded-full grid place-items-center w-9 h-9 border-solid border border-gray-300'
          /> */}
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
            <button
              onClick={() => setIsFavouritesModalOpen(true)}
              className='text-gray-300 p-2 bg-gray-700 hover:text-white rounded-xl hover:bg-gray-600 active:scale-95 transition-all'
            >
              <Bookmark01Icon />
            </button>
          </div>
          {/* <button className=' text-gray-800 bg-white p-1.5 rounded-2xl grid place-items-center active:scale-95 transition-all'>
            <Logo2 className='w-7 h-7' />
          </button> */}
          <img
            src={user?.picture}
            alt=''
            className='rounded-full grid place-items-center w-9 h-9 border-solid border border-gray-300'
          />
          {/* <div /> */}
        </div>
        <section className='bg-white md:max-h-[600px] md:max-w-4xl rounded-3xl flex flex-col gap-4 pt-6 pb-4 md:pb-2 md:pt-3 md:pl-2'>
          {children}
        </section>
      </div>
      {/* <Footer /> */}
      <FavouritesModal
        isVisible={isFavouritesModalOpen}
        onCancel={() => setIsFavouritesModalOpen(false)}
        onConfirm={onConfirmModal}
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
