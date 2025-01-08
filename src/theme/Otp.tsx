import OTPInput from 'react-otp-input'
import { OTP_INPUT_NUMBER } from '@/lib/constants'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@/assets/icons'

type Type = 'password' | 'text'

interface Props {
  value: string
  setValue: (otp: string) => void
  label?: string
}

export default function Otp({ value, setValue, label }: Props) {
  const [type, setType] = useState<Type>('password')

  function handleChangeVisibility() {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div className='flex flex-col gap-5'>
      {label && <span className='text-gray-600 font-medium text-center pt-2'>{label}</span>}
      <div className='flex items-center gap-2'>
        <OTPInput
          value={value}
          onChange={setValue}
          numInputs={OTP_INPUT_NUMBER}
          renderSeparator={<span className='text-gray-500'>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle={'pr-0 w-full p-0 m-0'}
          inputType={type}
          inputStyle={
            'w-[70px] text-xl font-medium h-[70px] p-2 rounded-2xl bg-gray-200 text-center flex justify-center items-center m-auto'
          }
          skipDefaultStyles
        />
        <button
          className='w-[80px] text-xl font-medium h-[70px] p-2 rounded-2xl bg-gray-800 text-center flex justify-center items-center active:scale-95 transition-all text-white'
          type='button'
          onClick={handleChangeVisibility}
        >
          {type === 'text' ? <ViewIcon /> : <ViewOffIcon />}
        </button>
      </div>
    </div>
  )
}
