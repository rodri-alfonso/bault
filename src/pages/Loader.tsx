import { Logo } from '@/assets/logo'

export default function LoaderPage() {
  return (
    <div className='grid place-items-center h-screen w-full gap-4'>
      <div className='grid gap-1 place-items-center text-gray-800 animate-pulse'>
        <Logo className='w-16 h-16' />
        <p className='text-xl font-extra-black text-center mb-10 uppercase'>Bault</p>
        {/* <div className='loader'></div> */}
      </div>
    </div>
  )
}
