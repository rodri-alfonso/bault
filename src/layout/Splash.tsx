import { MenuSquareIcon } from '@/assets/icons'
import { Logo2 } from '@/assets/logo'
import ConfirmModal from '@/components/Modals/Confirm'
import { authStore, signOut } from '@/stores/auth'
import { useState } from 'react'
import { useLocation } from 'wouter'

interface Props {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  isBlocked?: boolean
}

interface NavButtonProps {
  icon: React.ReactNode | React.ReactNode[]
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  primary?: boolean
}

function NavButton({ onClick, icon, loading, disabled, primary }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        primary
          ? 'disabled:hover:bg-gray-700 disabled:bg-gray-700 disabled:text-gray-300 text-gray-800 bg-white'
          : 'text-gray-300 bg-gray-700 hover:text-white hover:bg-gray-600  disabled:bg-gray-700 disabled:text-gray-200'
      }  p-2  rounded-xl  active:scale-95 transition-all
  disabled:opacity-40 disabled:scale-100  disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      {loading ? (
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
        icon
      )}
    </button>
  )
}

export default function SplashLayout({ children, className, isBlocked }: Props) {
  const [_, navigation] = useLocation()
  const { user } = authStore()
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleLogout() {
    signOut()
    setIsModalVisible(false)
  }

  const DesktopBanner = () => {
    return (
      <div className='relative flex flex-col justify-between items-start h-96 w-full'>
        <div className='hidden w-full md:mx-auto rounded-3xl md:rounded-[24px] h-32 bg-gray-800 absolute md:grid place-items-center'></div>
        <div className='bg-white rounded-[30px] p-3 m-auto z-20'>
          <Logo2 className='md:w-24 md:h-24 text-gray-800 md:p-1 w-28 h-28 p-0.5' />
        </div>
      </div>
    )
  }

  const MobileBanner = () => {
    return (
      <div className='relative flex flex-col justify-between items-start h-96 w-full'>
        <div className='w-full md:mx-auto rounded-3xl md:rounded-[24px] h-32 bg-gray-800 absolute grid place-items-center'></div>
        <div className='bg-white rounded-[30px] p-3 m-auto z-20'>
          <Logo2 className='md:w-24 md:h-24 text-gray-800 md:p-1 w-20 h-20 p-0.5' />
        </div>
      </div>
    )
  }

  return (
    <main className='grid place-items-center h-[var(--doc-height)] w-full relative md:px-4 bg-white md:bg-[url("/waves.svg")]'>
      <div
        className={`bg-white md:bg-gray-800 w-full md:w-auto md:p-2.5 md:rounded-[32px] md:flex ${
          user && !isBlocked ? 'md:min-w-[61.3rem]' : 'md:min-w-[57rem]'
        } relative`}
      >
        {!isBlocked && user && (
          <div className='hidden  md:flex flex-col items-center py-5 ml-2 mr-4 justify-between'>
            <button
              onClick={() => navigation('/')}
              className=' text-gray-800 bg-white p-1.5 rounded-xl grid place-items-center active:scale-95 transition-all'
            >
              <Logo2 className='w-7 h-7' />
            </button>
            {
              <nav className='grid gap-3'>
                <NavButton icon={<MenuSquareIcon />} onClick={() => setIsModalVisible(true)} />
              </nav>
            }
            <div />
            <div />
            <img
              src={user?.picture}
              alt=''
              className='rounded-full grid place-items-center w-9 h-9 border-solid border border-gray-300'
            />
          </div>
        )}
        {/* <section
          className={`h-screen md:relative pt-1.5 px-1.5 bg-white md:h-[586px] md:w-full md:max-w-4xl rounded-3xl grid gap-4 pb-4 md:pb-2 md:pt-3 md:px-3.5 ${className}`}
        >
          <div className='w-full md:mx-auto rounded-3xl md:rounded-[24px] h-32 bg-gray-800 relative grid place-items-center -mb-20'>
            <div className='absolute -bottom-14 bg-white rounded-[30px] p-3 m-auto'>
              <Logo2 className='md:w-24 md:h-24 text-gray-800 md:p-1 w-20 h-20 p-0.5' />
            </div>
          </div>
          {children}
        </section> */}
        <section
          className={` h-screen md:relative pt-1.5 px-1.5 bg-white md:h-[586px] md:w-full md:max-w-4xl rounded-3xl flex flex-col w-full items-start gap-4 pb-4 md:pb-2 md:pt-3 md:px-3.5 ${className}`}
        >
          <DesktopBanner />
          {children}
        </section>
      </div>
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
