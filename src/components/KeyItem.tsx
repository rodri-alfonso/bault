import { CopyIcon, TickIcon } from '@/assets/icons'

interface Props {
  checked: boolean
  onCheck: () => void
  value: string
}

export default function KeyItem({ checked, onCheck, value }: Props) {
  return (
    <div className={`h-10 flex items-center text-gray-400 gap-3 w-full ${checked ? 'justify-start' : ''}`}>
      <button
        onClick={onCheck}
        className={`active:scale-95 transition-all w-6 overflow-hidden h-6 border-gray-700 rounded-lg border-solid border-2 grid place-items-center
            ${checked ? 'bg-gray-700' : 'bg-white'}
            `}
      >
        {checked && <TickIcon className={`w-full h-full text-white bg-gray-700`} />}
      </button>
      <p
        className={`truncate w-auto max-w-[200px] ${
          checked ? 'line-through text-gray-300 font-medium' : 'font-medium text-gray-500'
        }`}
      >
        {value}
      </p>
      <button
        className='ml-auto text-white rounded-xl p-2 active:scale-95 transition-all z-20 bg-gray-800 disabled:opacity-30 disabled:pointer-events-none'
        disabled={checked}
      >
        <CopyIcon className='w-5 h-5' />
      </button>
    </div>
  )
}
