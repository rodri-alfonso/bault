import { useState } from 'react'
import Button from '@/theme/Button'
import OtpInput, { AllowedInputTypes } from 'react-otp-input'

const MAX_NUMBER_INPUTS = 4

export default function RegisterPage() {
  const [otp, setOtp] = useState('')
  const [type, setType] = useState<AllowedInputTypes>('password')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('🚀 ~ RegisterPage ~ otp:', otp)
    if (!otp.length) return
  }

  function handleChangeVisibility() {
    setType(type === 'password' ? 'number' : 'password')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>I'm the register page!!!!!!</h1>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={MAX_NUMBER_INPUTS}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        containerStyle={'p-8 w-full'}
        inputType={type}
        inputStyle={'border-2 border-black w-[50px] h-[50px] p-2 flex justify-center items-center'}
        skipDefaultStyles
        shouldAutoFocus
      />

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={MAX_NUMBER_INPUTS}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        containerStyle={'p-8 w-full'}
        inputType={type}
        inputStyle={'border-2 border-black w-[50px] h-[50px] p-2 flex justify-center items-center'}
        skipDefaultStyles
        shouldAutoFocus
      />

      <button type='button' onClick={handleChangeVisibility}>
        Change visibility
      </button>
      <Button label='Send' disabled={otp.length !== MAX_NUMBER_INPUTS} loading={false} />
    </form>
  )
}
