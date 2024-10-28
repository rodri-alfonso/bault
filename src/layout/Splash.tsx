import { Logo2 } from '@/assets/logo'

interface Props {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export default function SplashLayout({ children, className }: Props) {
  return (
    <section className={`w-full h-screen flex flex-col ${className}`}>
      <div className='w-full h-56 bg-gray-800 rounded-b-[90px] relative grid place-items-center'>
        <div className='absolute -bottom-14 bg-white rounded-[30px] p-3 m-auto'>
          <Logo2 className='w-24 h-24' />
        </div>
      </div>
      {children}
    </section>
  )
}
