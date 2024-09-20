import { setSecureCode } from '@/services/security'
import { authStore } from '@/stores/auth'
import { useState } from 'react'
import OtpInput, { AllowedInputTypes } from 'react-otp-input'
import Button from '@/theme/Button'
import { useLocation } from 'wouter'
import { ViewIcon, ViewOffIcon } from '@/assets/icons'

const MAX_NUMBER_INPUTS = 4

export default function SecurePage() {
  const { user } = authStore()
  const [otp, setOtp] = useState('')
  const [confirmOtp, setConfirmOtp] = useState('')
  const [type, setType] = useState<AllowedInputTypes>('password')
  const [isLoading, setIsLoading] = useState(false)
  const [_, navigate] = useLocation()

  function handleSetSecureCode() {
    const userId = user?.id || ''

    setIsLoading(true)
    setSecureCode(userId, otp)
      .then(() => {
        alert('Code setted')
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
    <div className='grid place-items-center gap-2'>
      <div className=''>
        <p>Set your secure code</p>
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
      </div>
      <div className=''>
        <p>Confirm your secure code</p>
        <OtpInput
          value={confirmOtp}
          onChange={setConfirmOtp}
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
      </div>

      <div className='m-auto flex gap-2'>
        <button type='button' onClick={handleChangeVisibility}>
          Change visibility
        </button>

        {type === 'password' ? <ViewIcon /> : <ViewOffIcon />}
      </div>
      <Button
        label={isLoading ? 'Setting code...' : 'Set secure code'}
        disabled={isLoading || otp.length !== MAX_NUMBER_INPUTS || otp !== confirmOtp}
        loading={isLoading}
        onClick={handleSetSecureCode}
      />
    </div>
  )
}
