import { ViewOffIcon, ViewIcon, CopyIcon, TickIcon } from '@/assets/icons'
import { useEffect, useState } from 'react'
import Alert from './Alert'
import { ALERT_COPY_DEFAULT_MESSAGE } from '@/lib/config'
import { copyToClipboard } from '@/lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: React.ReactNode
  color?: string
  canCopy?: boolean
}

export default function Input({ onChange, placeholder, value, canCopy, icon, type = 'text', color, ...props }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [wasCopied, setWasCopied] = useState(false)

  useEffect(() => {
    if (wasCopied)
      setTimeout(() => {
        setWasCopied(false)
        setIsAlertVisible(false)
      }, 1000)
  }, [wasCopied])

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev)
  }

  const PasswordButton = () => {
    return (
      <button onClick={togglePasswordVisibility} className='active:scale-95 transition-all'>
        {isPasswordVisible ? <ViewIcon className='w-5 h-5' /> : <ViewOffIcon className='w-5 h-5' />}
      </button>
    )
  }

  function handleCopy() {
    if (isAlertVisible) return

    copyToClipboard(String(value)).then(() => {
      setIsAlertVisible(true)
      setWasCopied(true)
    })
  }

  const TrailerIcon = () => {
    if (!canCopy) return null

    return (
      <button onClick={handleCopy} className='p-1.5 rounded-xl text-gray-600 active:scale-95 transition-all'>
        {wasCopied ? <TickIcon /> : <CopyIcon />}
      </button>
    )
  }

  return (
    <div
      className={`py-2 px-4 rounded-xl flex items-center gap-1.5 text-gray-600 ${canCopy ? 'pr-3' : ''}`}
      style={{ backgroundColor: color + '4D' || '#dddd' }}
    >
      <div className='text-gray-600'>{icon}</div>
      <input
        className={`w-full p-1 rounded outline-none focus:border-blue-500 bg-transparent text-gray-800`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={isPasswordVisible ? 'text' : type}
        {...props}
      />
      <TrailerIcon />
      {type === 'password' && <PasswordButton />}
      <Alert
        isVisible={isAlertVisible}
        message={ALERT_COPY_DEFAULT_MESSAGE}
        onClose={() => setIsAlertVisible(false)}
        isEphemeral
      />
    </div>
  )
}
