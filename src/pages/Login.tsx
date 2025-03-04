import { signIn } from '../stores/auth'
import Button from '@/theme/Button'
import { GoogleIcon } from '@/assets/icons'
import SplashLayout from '@/layout/Splash'

export default function LoginPage() {
  return (
    <SplashLayout>
      <div className='grid  mx-auto  sm:max-w-sm'>
        <div className='pt-10'>
          <p className='text-3xl font-extrabold text-center text-gray-800'>Welcome to Bault,</p>
          <p className='text-3xl font-semibold text-gray-500 text-center'>Your new password keeper.</p>

          <div className='grid place-items-center text-center m-auto pt-8 mx-10'>
            <p className='text-base font-medium text-center text-gray-500'>
              All your passwords saved and secure in one place.
            </p>
          </div>
        </div>

        <div className='mt-auto pb-10 grid gap-4 px-10'>
          <Button label='Login with Google' onClick={signIn} className='' icon={<GoogleIcon />} />
          <p className='text-sm text-center font-medium underline'> Or check the playground</p>
        </div>
      </div>
    </SplashLayout>
  )
}
