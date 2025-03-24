import OTPInput from 'react-otp-input'
import { OTP_INPUT_NUMBER } from '@/lib/constants'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@/assets/icons'

type Type = 'password' | 'text'

interface Props {
  value: string
  setValue: (otp: string) => void
  label?: string
  hidden?: boolean
}

export default function Otp({ value, setValue, label, hidden = false }: Props) {
  const [type, setType] = useState<Type>(() => 'text')

  function handleChangeVisibility() {
    setType(type === 'password' ? 'text' : 'password')
  }

  useEffect(() => {
    handleChangeVisibility()
  }, [hidden])

  return (
    <div className='flex flex-col gap-5 flex-wrap md:flex-nowrapx'>
      {label && <span className='text-gray-600 font-medium text-center pt-2'>{label}</span>}
      <div className='flex items-center gap-2 px-4 flex-wrap md:px-0 md:flex-nowrap'>
        <OTPInput
          value={value}
          onChange={setValue}
          numInputs={OTP_INPUT_NUMBER}
          renderSeparator={<span className='text-gray-500 '>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle={'pr-0 w-full p-0 m-0 grid place-items-center'}
          inputType={type}
          shouldAutoFocus
          inputStyle={
            'w-[60px] h-[60px] md:w-[70px] text-xl font-medium md:h-[70px] p-2 rounded-2xl bg-gray-200 text-center flex justify-center items-center m-auto'
          }
          skipDefaultStyles
        />
        <button
          className='hidden w-[80px] text-xl font-medium h-[70px] p-2 rounded-2xl bg-gray-800 text-center md:flex justify-center items-center active:scale-95 transition-all text-white'
          type='button'
          onClick={handleChangeVisibility}
        >
          {type === 'text' ? <ViewIcon /> : <ViewOffIcon />}
        </button>
      </div>
    </div>
  )
}
