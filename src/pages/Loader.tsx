import { Logo2 } from '@/assets/logo'

export default function LoaderPage() {
  return (
    <div className='grid place-items-center md:bg-white h-screen w-full gap-4 text-gray-800 '>
      <Logo2 className='w-20 h-20 animate-pulse' />
    </div>
  )
}
