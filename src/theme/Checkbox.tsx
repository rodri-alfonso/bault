import { TickIcon } from '@/assets/icons'

type ConfigType = 'LOWERCASE' | 'UPPERCASE' | 'SYMBOLS' | 'NUMBERS'

interface Props {
  checked: boolean
  onChange: () => void
  label?: string
  type: ConfigType
  disabled?: boolean
}

export default function Checkbox({ checked, onChange, label, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onChange}
      className={`w-full active:scale-95 transition-all py-1.5 px-2 rounded-xl border border-solid border-gray-300 
        ${checked ? 'bg-gray-800 text-white' : 'bg-inherit text-gray-800'}
        ${disabled ? 'cursor-not-allowed opacity-40 active:scale-100' : ''}
        `}
    >
      <div className='flex items-center justify-center gap-1.5 w-full h-full'>
        <label className='text-sm font-medium lowercase'>{label}</label>
      </div>
    </button>
  )
}
