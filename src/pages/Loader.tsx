import { Logo2 } from '@/assets/logo'

export default function LoaderPage() {
  return (
    <div className='grid place-items-center h-screen w-full gap-4'>
      <div className='grid gap-4 place-items-center text-gray-800 animate-pulse'>
        <Logo2 className='w-20 h-20' />
        {/* <p className='text-xl font-bold text-center mb-10'>Bault</p> */}
        <div className='loader'></div>
      </div>
    </div>
  )
}
