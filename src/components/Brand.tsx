import { Logo2 } from '@/assets/logo'

export default function Brand() {
  return (
    // <section className='flex items-center gap-2 absolute top-6 mx-auto bg-gray-800 rounded-full w-auto text-white p-1.5 pr-4'>
    //   <Logo2 className='w-8 h-8 bg-white text-gray-800 rounded-full p-0.5' />
    //   <span className='font-semibold'>Vault</span>
    // </section>
    <section className='flex items-center gap-1.5 absolute top-6 mx-auto w-auto p-1.5 pr-4'>
      {/* <Logo2 className='w-9 h-9 bg-gray-200 text-gray-800 rounded-xl p-2' /> */}

      <span className=' text-gray-800 rounded-xl p-1 bg-gray-100'>
        <Logo2 className='w-9 h-9' />
      </span>
      <span className='font-semibold text-gray-700 text-2xl'>Vault</span>
    </section>
  )
}
