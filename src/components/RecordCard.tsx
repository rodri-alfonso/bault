import { RegisterWithId } from '@/services/records'
import { CopyIcon } from '@/assets/icons'
import Typography from '@/theme/Typography'
import Alert from '@/theme/Alert'
import { useState } from 'react'

interface Props {
  record: RegisterWithId
  full?: boolean
}

export default function RecordCard({ record, full }: Props) {
  const [isAlertVisible, setIsAlertVisible] = useState(false)

  function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    if (isAlertVisible) return

    e.stopPropagation()
    e.preventDefault()

    setIsAlertVisible(true)
  }

  return (
    <article
      style={{
        backgroundColor: record.color || 'whitesmoke',
      }}
      className={`rounded-3xl p-7 flex items-center justify-between shadow-lg ${
        full ? 'w-full' : 'max-w-[380px] min-w-[310px]'
      } active:scale-95 transition-all cursor-pointer`}
      onClick={handleCopy}
    >
      <div className='flex items-center gap-4'>
        <div className='grid place-items-center w-10 h-10 bg-gray-900 rounded-full text-white'>
          <Typography text={record.site[0]?.toUpperCase()} className='text-lg font-semibold' />
        </div>

        <div className='grid w-10'>
          <p className='font-semibold'>{record.site}</p>
          <p className='text-sm text-gray-700 -mt-1.5 truncate w-32 '>{record.user}</p>
        </div>
      </div>

      <div className='text-white p-2 shadow-sm rounded-xl bg-gray-800 active:scale-95 transition-all'>
        <CopyIcon />
      </div>
      <Alert
        isVisible={isAlertVisible}
        message='Copied to clipboard!'
        onClose={() => setIsAlertVisible(false)}
        isEphemeral
      />
    </article>
  )
}
