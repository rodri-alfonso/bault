import { setSecureCode } from '@/services/security'
import { authStore } from '@/stores/auth'
import { useState } from 'react'
import Button from '@/theme/Button'
import Otp from '@/theme/Otp'
import SplashLayout from '@/layout/Splash'
import ModalError from '@/components/Modals/Error'
import { timestampStore } from '@/stores/timestamp'

const MAX_NUMBER_INPUTS = 4

export default function SecurePage() {
  const { user } = authStore()
  const { setTimestamp } = timestampStore()
  const [otp, setOtp] = useState('')
  const [confirmOtp, setConfirmOtp] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (otp !== confirmOtp) {
      setIsModalVisible(true)
      return
    }

    const userId = user?.id || ''

    setIsLoading(true)
    setSecureCode(userId, otp)
      .then(() => {
        setTimestamp()
        location.reload()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <SplashLayout>
      <form onSubmit={handleSubmit} className='h-full flex flex-col mx-auto gap-10 sm:max-w-sm'>
        <div className='pt-20'>
          <h1 className='text-2xl font-bold text-center'>Security step</h1>
          <p className='text-center text-gray-500'>Let's create a 4-digit code to access to your bault</p>
        </div>

        <div className='h-1/2 overflow-y-auto grid gap-4'>
          <Otp value={otp} setValue={setOtp} label='Security code' />
          <Otp value={confirmOtp} setValue={setConfirmOtp} label='Repeat security code' />
        </div>

        <div className='grid px-3 pb-4 gap-2 mt-auto'>
          <Button
            label={isLoading ? 'Creating...' : 'Create'}
            disabled={isLoading || confirmOtp.length !== MAX_NUMBER_INPUTS}
            loading={isLoading}
          />
        </div>
      </form>
      <ModalError
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={() => setIsModalVisible(false)}
        confirmText='Close'
        title='Validation error'
        message='The security codes do not match.'
      />
    </SplashLayout>
  )
}
