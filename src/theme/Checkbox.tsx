import { TickIcon } from '@/assets/icons'

type ConfigType = 'LOWERCASE' | 'UPPERCASE' | 'SYMBOLS' | 'NUMBERS'

interface Props {
  checked: boolean
  onChange: () => void
  label?: string
  type: ConfigType
}

export default function Checkbox({ checked, onChange, label }: Props) {
  return (
    <button
      onClick={onChange}
      className={`w-full active:scale-95 transition-all py-1.5 px-2 rounded-xl border border-solid border-gray-300 ${
        checked ? 'bg-gray-800 text-white' : 'bg-inherit text-gray-800'
      }`}
    >
      <div className='flex items-center gap-1.5 w-full h-full'>
        <div className={`${checked ? 'bg-white' : 'bg-gray-100'} rounded-full w-5 h-5 grid place-items-center`}>
          {checked ? (
            <TickIcon className='w-4 h-4 text-gray-800' />
          ) : (
            <div className='border border-solid border-gray-300 w-full h-full rounded-full' />
          )}
        </div>
        <label className='text-sm font-medium'>{label}</label>
      </div>
    </button>
  )
}
