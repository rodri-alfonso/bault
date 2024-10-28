import { useState } from 'react'
import Button from '@/theme/Button'
import OtpInput, { AllowedInputTypes } from 'react-otp-input'
import { timestampStore } from '@/stores/timestamp'
import { useLocation } from 'wouter'
import { ViewIcon, ViewOffIcon } from '@/assets/icons'
import { isSecureMatch } from '@/services/security'
import { authStore } from '@/stores/auth'
import ModalError from '@/components/Modals/Error'
import SplashLayout from '@/layout/Splash'

const MAX_NUMBER_INPUTS = 4

export default function SecurityPage() {
  const { user } = authStore()
  const [otp, setOtp] = useState('')
  const [type, setType] = useState<AllowedInputTypes>('text')
  const { setIsProtected, setTimestamp } = timestampStore()
  const [_, navigate] = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!otp.length) return

    setIsLoading(true)

    isSecureMatch(user?.id || '', otp)
      .then((isVerificated) => {
        if (!isVerificated) {
          // alert('Invalid code')
          setIsModalVisible(true)
          setOtp('')
          return
        }

        setTimestamp()
        setIsProtected(false)
        navigate('/')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleChangeVisibility() {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <SplashLayout>
      <form onSubmit={handleSubmit} className='h-full flex flex-col mx-auto gap-10 sm:max-w-sm pt-24'>
        <div>
          <h1 className='text-2xl font-bold text-center'>Verification</h1>
          <p className='text-center text-gray-500'>Enter the 4-digit code to verify your bault</p>
        </div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={MAX_NUMBER_INPUTS}
          renderSeparator={<span className='text-gray-500'>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle={'p-8 w-full p-0 m-0'}
          inputType={type}
          inputStyle={
            'w-[70px] text-xl font-medium h-[70px] p-2 rounded-2xl bg-gray-200 text-center flex justify-center items-center m-auto'
          }
          skipDefaultStyles
          shouldAutoFocus
        />
        <div className='grid px-3 pb-4 gap-2 mt-auto'>
          <Button
            label={isLoading ? 'Verifying...' : 'Verify'}
            disabled={isLoading || otp.length !== MAX_NUMBER_INPUTS}
            loading={isLoading}
          />
          <Button
            label='Change visibility'
            onClick={handleChangeVisibility}
            icon={type === 'password' ? <ViewIcon /> : <ViewOffIcon />}
            type='button'
            className='bg-white !text-gray-500 border border-solid border-gray-500'
          />
        </div>
        <ModalError isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      </form>
    </SplashLayout>
  )
}
