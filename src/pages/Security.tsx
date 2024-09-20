import { useState } from 'react'
import Button from '@/theme/Button'
import OtpInput, { AllowedInputTypes } from 'react-otp-input'
import { timestampStore } from '@/stores/timestamp'
import { useLocation } from 'wouter'
import { ViewIcon, ViewOffIcon } from '@/assets/icons'
import { isSecureMatch } from '@/services/security'
import { authStore } from '@/stores/auth'

const MAX_NUMBER_INPUTS = 4

export default function SecurityPage() {
  const { user } = authStore()
  const [otp, setOtp] = useState('')
  const [type, setType] = useState<AllowedInputTypes>('password')
  const { setIsProtected, setTimestamp } = timestampStore()
  const [_, navigate] = useLocation()
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!otp.length) return

    setIsLoading(true)

    isSecureMatch(user?.id || '', otp)
      .then((isVerificated) => {
        if (!isVerificated) {
          alert('Invalid code')
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
    setType(type === 'password' ? 'number' : 'password')
  }

  return (
    <form onSubmit={handleSubmit} className='h-screen grid'>
      <div>
        <h1 className='text-2xl font-bold text-center mt-8'>Verification</h1>
        <p className='text-center text-gray-500'>Enter the 4-digit code sent to your email</p>
      </div>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={MAX_NUMBER_INPUTS}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        containerStyle={'p-8 w-full m-auto'}
        inputType={type}
        inputStyle={
          'w-[80px] text-xl font-medium h-[80px] p-2 rounded-xl bg-gray-200 text-center flex justify-center items-center m-auto'
        }
        skipDefaultStyles
        shouldAutoFocus
      />
      <div className='m-auto flex gap-2'>
        <button type='button' onClick={handleChangeVisibility}>
          Change visibility
        </button>

        {type === 'password' ? <ViewIcon /> : <ViewOffIcon />}
      </div>
      <div className='grid px-3 mt-auto pb-4'>
        <Button
          label={isLoading ? 'Sending...' : 'Send'}
          disabled={isLoading || otp.length !== MAX_NUMBER_INPUTS}
          loading={isLoading}
        />
      </div>
    </form>
  )
}
