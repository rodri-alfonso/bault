import Header from '@/components/Header'
import NewPage from '@/layout/NewPage'
import Heading from '@/components/Heading'

import Input from '@/theme/Input'
import { useState } from 'react'
import { encrypt } from '@/lib/encryption'
import { addRecord } from '@/services/records'
import type { Register, Key } from 'types'
import { useLocation } from 'wouter'
import { CARDS_COLORS } from '@/lib/colors'
import { EarthIcon, MailIcon, PasswordIcon, UserIcon, KeyIcon, AddCircleIcon, PlusIcon } from '@/assets/icons'
import Typography from '@/theme/Typography'
import Button from '@/theme/Button'
import ColorPicker from '@/components/ColorPicker'
import { recordStore } from '@/stores/records'

const randomColor = CARDS_COLORS[Math.floor(Math.random() * CARDS_COLORS.length)]

export default function CreatorPage() {
  const [site, setSite] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [keys, setKeys] = useState<Key[]>([])
  const [currentKey, setCurrentKey] = useState('')
  const [color, setColor] = useState(randomColor)
  const { setRecords } = recordStore()

  const [loading, setLoading] = useState(false)

  const [_, navigate] = useLocation()

  const isEmptyForm = !site || !email || !password || !user

  const handleCreate = () => {
    if (isEmptyForm) return

    setLoading(true)

    const payload: Register = {
      email: encrypt(email),
      password: encrypt(password),
      site: encrypt(site),
      user: encrypt(user),
      marked: false,
      keys: keys.map((key) => ({ ...key, value: encrypt(key.value) })),
      color: color,
    }

    addRecord(payload).then(() => {
      setRecords([])
      navigate('/')
    })
  }

  function handleAddKey() {
    if (!currentKey) return

    const isKeyAlreadyAdded = keys.some((key) => key.value.toLowerCase() === currentKey.toLowerCase())
    if (isKeyAlreadyAdded) return setCurrentKey('')

    setKeys([
      ...keys,
      {
        value: currentKey,
        checked: false,
      },
    ])
    setCurrentKey('')
  }

  function handleDeleteKey(keyToDelete: string) {
    setKeys(keys.filter((key) => key.value !== keyToDelete))
  }

  return (
    <NewPage onSaveCreating={handleCreate} loadingCreating={loading} disabledCreating={loading || isEmptyForm}>
      <Header className='md:hidden' />
      <Heading className='pt-2 px-4 md:pt-6' title='Welcome,' subtitle="Let's create a new record!" />
      <div className='absolute top-6 right-4 md:right-4 md:top-4'>
        <ColorPicker color={color} setColor={setColor} />
      </div>

      <article
        style={{
          backgroundColor: color,
        }}
        className='rounded-3xl p-7 flex items-center md:pr-0 justify-between shadow-lg md:max-w-md md:ml-4 md:mt-6'
      >
        <div className='flex items-center gap-4'>
          <div className='grid place-items-center w-10 h-10 bg-gray-900 rounded-full text-white'>
            <Typography text={site[0]?.toUpperCase() || 'S'} className='text-lg font-semibold' />
          </div>

          <div className='grid w-auto'>
            <p className='font-semibold'>{site || 'Site'}</p>
            <p className='text-sm text-gray-700 -mt-1.5'>{user || 'User'}</p>
          </div>
        </div>
      </article>

      <div className='grid md:grid-cols-2 gap-3 pb-6 h-full overflow-y-auto md:overflow-hidden md:px-4 md:pr-5'>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold pt-6 pb-2'>Information</p>

          <Input
            icon={<EarthIcon />}
            label='Site'
            onChange={(e) => setSite(e.target.value)}
            value={site}
            placeholder='Site'
            color={color}
          />
          <Input
            icon={<MailIcon />}
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Email'
            color={color}
          />
          <Input
            icon={<PasswordIcon />}
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            color={color}
            type='password'
          />
          <Input
            icon={<UserIcon />}
            label='User'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            placeholder='User'
            color={color}
          />
        </div>

        <section className='flex flex-col gap-4 md:overflow-y-auto h-full relative'>
          <p className='font-semibold pt-6'>Security Keys</p>
          <div
            className='py-2 px-4 rounded-xl flex items-center gap-1.5 text-gray-600'
            style={{ backgroundColor: color + '4D' || '#dddd' }}
          >
            <div>{<KeyIcon />}</div>
            <input
              className={`w-full p-1 rounded outline-none focus:border-blue-500 bg-transparent text-gray-800`}
              placeholder='Add new key'
              value={currentKey}
              onChange={(e) => setCurrentKey(e.target.value)}
            />
            {currentKey && (
              <button
                onClick={handleAddKey}
                className='hover:text-gray-700 active:scale-95 transition-all bg-gray-700 rounded-full'
              >
                <AddCircleIcon className=' text-white ' />
              </button>
            )}
          </div>

          <section className='grid gap-1 pt-2 md:pt-0 px-3'>
            {keys.map((key) => (
              <div className={`h-10 flex items-center justify-between text-gray-400 gap-3 w-full`} key={key.value}>
                <p className={`truncate w-auto max-w-[200px] font-medium text-gray-500`}>{key.value}</p>
                <button
                  onClick={() => handleDeleteKey(key.value)}
                  className={`active:scale-95 transition-all rounded-xl p-1 bg-gray-700 border-2 border-solid border-gray-300 `}
                >
                  <PlusIcon className='rotate-45 w-5 h-5  grid place-items-center text-gray-100 ' />
                </button>
              </div>
            ))}
          </section>
        </section>
      </div>
      <div className='mt-auto sticky bottom-0 z-20 grid py-3 bg-white md:hidden'>
        <Button label={'Create'} onClick={handleCreate} disabled={loading || isEmptyForm} loading={loading} />
      </div>
    </NewPage>
  )
}
