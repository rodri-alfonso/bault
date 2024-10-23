import { BookmarkFilledIcon, BookmarkIcon } from '@/assets/icons'
import Typography from '@/theme/Typography'
import { decrypt } from '@/lib/encryption'
import type { Register } from 'types'
import IconButton from '@/theme/IconButton'

interface Props {
  onSelect: (id: string) => void
  record: Register & { id: string }
}

export default function RecordBookmark({ record, onSelect }: Props) {
  const { color, marked, site, user, id } = record

  return (
    <article
      style={{ backgroundColor: marked ? color : color + '33' || 'whitesmoke' }}
      className='rounded-3xl p-4 flex gap-6 items-center justify-between shadow-lg active:scale-95 transition-all cursor-pointer'
      onClick={() => onSelect(id)}
    >
      <div className='flex items-center gap-4'>
        <div className=' bg-gray-900 rounded-full text-white'>
          <Typography
            text={decrypt(site)[0]?.toUpperCase()}
            className='w-10 h-10 text-lg font-semibold grid place-items-center'
          />
        </div>

        <div className='grid w-auto'>
          <p className='font-semibold truncate'>{decrypt(site)}</p>
          <p className='text-sm text-gray-500 -mt-1.5 truncate'>{decrypt(user)}</p>
        </div>
      </div>
      <IconButton
        icon={
          marked ? (
            <BookmarkFilledIcon className='w-6 h-6 text-gray-800' />
          ) : (
            <BookmarkIcon className='w-6 h-6 text-gray-700' />
          )
        }
      />
    </article>
  )
}
