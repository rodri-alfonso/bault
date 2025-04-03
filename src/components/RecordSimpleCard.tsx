import { ALERT_COPY_DEFAULT_MESSAGE } from '@/lib/config'
import { decrypt } from '@/lib/encryption'
import { copyToClipboard } from '@/lib/utils'
import Alert from '@/theme/Alert'
import Typography from '@/theme/Typography'
import { useState } from 'react'

interface Props {
  color?: string
  site: string
  user: string
  password?: string
}

export default function RecordSimpleCard({ site, user, color, password = '' }: Props) {
  const [isAlertVisible, setIsAlertVisible] = useState(false)

  function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    if (isAlertVisible) return

    e.stopPropagation()
    e.preventDefault()

    const decryptedPassword = decrypt(password)
    copyToClipboard(decryptedPassword)

    setIsAlertVisible(true)
  }

  return (
    <article
      style={{ backgroundColor: color || 'whitesmoke' }}
      className='rounded-3xl p-7 flex items-center justify-between shadow-lg active:scale-95 transition-all cursor-pointer'
      onClick={handleCopy}
    >
      <div className='flex items-center gap-4'>
        <div className='grid place-items-center w-10 h-10 bg-gray-900 rounded-full text-white'>
          <Typography text={site[0]?.toUpperCase()} className='text-lg font-semibold' />
        </div>

        <div className='grid w-auto'>
          <p className='font-semibold'>{site}</p>
          <p className='text-sm text-gray-700 -mt-1.5'>{user}</p>
        </div>
      </div>
      <Alert
        isVisible={isAlertVisible}
        message={ALERT_COPY_DEFAULT_MESSAGE}
        onClose={() => setIsAlertVisible(false)}
        isEphemeral
      />
    </article>
  )
}
