import { useState } from 'react'
import Button from '@/theme/Button'
import { timestampStore } from '@/stores/timestamp'
import { useLocation } from 'wouter'
import { isSecureMatch } from '@/services/security'
import { authStore } from '@/stores/auth'
import ModalError from '@/components/Modals/Error'
import SplashLayout from '@/layout/Splash'
import Otp from '@/theme/Otp'

const MAX_NUMBER_INPUTS = 4

interface Props {
  onChangePass: () => void
}

export default function SecurityPage({ onChangePass }: Props) {
  const { user } = authStore()
  const [otp, setOtp] = useState('')
  // const { setIsProtected, setTimestamp } = timestampStore()
  const [_, navigate] = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!otp.length) return

    setIsLoading(true)

    isSecureMatch(user?.id || '', otp)
      .then((isVerificated) => {
        if (!isVerificated) {
          setIsModalVisible(true)
          setOtp('')
          return
        }

        // setTimestamp()
        // setIsProtected(false)
        onChangePass()
        navigate('/')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <SplashLayout isBlocked>
      <form onSubmit={handleSubmit} className='h-full flex flex-col mx-auto gap-10 sm:max-w-sm'>
        <div>
          <h1 className='text-2xl font-bold text-center'>Verification</h1>
          <p className='text-center text-gray-500'>Enter the 4-digit code to verify your bault</p>
        </div>
        <Otp value={otp} setValue={setOtp} hidden={hidePassword} />
        <div className='grid pb-4 gap-2 mt-auto px-4'>
          <Button
            label={isLoading ? 'Verifying...' : 'Verify'}
            disabled={isLoading || otp.length !== MAX_NUMBER_INPUTS}
            loading={isLoading}
          />
          <Button
            label={`${hidePassword ? 'Show' : 'Hide'} password`}
            type='button'
            onClick={() => setHidePassword((prev) => !prev)}
            className='md:hidden visible !bg-gray-50 !text-gray-600 font-medium border border-solid border-gray-300'
          />
        </div>
        <ModalError
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onConfirm={() => setIsModalVisible(false)}
          confirmText='Close'
          title='Verification error'
          message='The security code is invalid.'
        />
      </form>
    </SplashLayout>
  )
}
