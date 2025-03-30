import { useParams, useLocation } from 'wouter'
import { deleteRecord, editRecord } from '@/services/records'
import { decrypt, encrypt } from '@/lib/encryption'
import Header from '@/components/Header'
import { AddCircleIcon, EarthIcon, KeyIcon, MailIcon, PasswordIcon, UserIcon } from '@/assets/icons'
import { useEffect, useState } from 'react'
import RecordCard from '@/components/RecordCard'
import Input from '@/theme/Input'
import ColorPicker from '@/components/ColorPicker'
import Button from '@/theme/Button'
import { Key } from '@/types'
import KeyItem from '@/components/KeyItem'
import LoaderPage from './Loader'
import { useRecord } from '@/hooks/useRecords'
import NewPage from '@/layout/NewPage'
import Heading from '@/components/Heading'
import { recordStore } from '@/stores/records'
import ConfirmModal from '@/components/Modals/Confirm'
import GeneratorModal from '@/components/Modals/Generator'

export default function RecordPage() {
  const [location, navigate] = useLocation()
  const { id } = useParams()
  const { isLoading, record } = useRecord(id)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isGeneratorVisible, setIsGeneratorVisible] = useState(false)

  const [site, setSite] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [color, setColor] = useState('')
  const [isEnabledButton, setIsEnabledButton] = useState(false)
  const [keys, setKeys] = useState<Key[]>([])
  const [currentKey, setCurrentKey] = useState('')
  const { setRecords } = recordStore()

  const [wasCopied, setWasCopied] = useState(false)

  useEffect(() => {
    if (wasCopied) setTimeout(() => setWasCopied(false), 1000)
  }, [wasCopied])

  useEffect(() => {
    if (!isLoading && record) {
      setSite(decrypt(record.site))
      setEmail(decrypt(record.email))
      setPassword(decrypt(record.password))
      setUser(decrypt(record.user))
      setColor(record.color)
      setKeys(record.keys.map((key) => ({ checked: key.checked, value: decrypt(key.value) })))
    }
  }, [isLoading])

  function toggleKey(keyToChange: string) {
    const updatedKeys = keys.map((key) => {
      return key.value === keyToChange ? { value: key.value, checked: !key.checked } : key
    })

    setKeys(updatedKeys)
  }

  function handleEdit() {
    setIsEditing(true)

    const payload = {
      site: encrypt(site),
      email: encrypt(email),
      password: encrypt(password),
      user: encrypt(user),
      keys: keys.map((key) => ({ ...key, value: encrypt(key.value) })),
      color,
    }

    editRecord(id, payload).then(() => {
      setRecords([])
      navigate('/')
    })
  }

  function handleChange(
    type: 'site' | 'email' | 'password' | 'user' | 'color' | 'keys' | 'addKey',
    payload: string | boolean
  ) {
    if (!record) return

    const TYPE_MAP = {
      site: setSite,
      email: setEmail,
      password: setPassword,
      user: setUser,
      color: setColor,
      keys: toggleKey,
      addKey: handleAddKey,
    }

    const setter = TYPE_MAP[type] as any

    setter(payload)

    setIsEnabledButton(
      site === decrypt(record.site) ||
        email === decrypt(record.email) ||
        password === decrypt(record.password) ||
        user === decrypt(record.user) ||
        color === record.color ||
        record.keys.length !== keys.length
    )
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

  function handleDelete() {
    setIsDeleting(true)
    const locationId = location.split('/')[2]
    deleteRecord(locationId).then(() => {
      setRecords([])
      navigate('/')
    })
  }

  if (isLoading || !record) return <LoaderPage />

  return (
    <NewPage
      disabledEditing={isEditing || !isEnabledButton}
      loadingEditing={isEditing}
      onSaveEditing={handleEdit}
      className='px-4 h-screen md:px-0'
    >
      <Header className='md:hidden' />

      <div className='flex items-start gap-2 absolute right-16 top-6 md:right-4 md:top-4'>
        <section className=' flex items-center '>
          <ColorPicker color={color} setColor={(payload) => handleChange('color', payload)} />
        </section>
        <button
          onClick={() => setIsGeneratorVisible(true)}
          className='md:hidden text-gray-900 p-2 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-95 transition-all'
        >
          <KeyIcon />
        </button>
      </div>

      <Heading subtitle="Let's check your record!" title='Welcome back,' className='pt-2 px-4 md:pt-10' />
      <div className='pt-2 md:px-4 md:pt-6 md:pr-5 md:max-w-md'>
        <RecordCard full record={{ email, site, user, color, password, keys, id, marked: record.marked }} />
      </div>

      <div className='grid md:grid-cols-2 gap-3 pb-6 h-full overflow-y-auto md:overflow-hidden md:px-4 md:pr-5'>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold pt-6 pb-2'>Information</p>
          <Input
            icon={<EarthIcon className='w-5 h-5' />}
            label='Site'
            onChange={(e) => handleChange('site', e.target.value)}
            value={site}
            placeholder='Site'
            color={color}
          />
          <Input
            icon={<MailIcon className='w-5 h-5' />}
            label='Email'
            onChange={(e) => handleChange('email', e.target.value)}
            value={email}
            placeholder='Email'
            color={color}
            canCopy
          />
          <Input
            icon={<PasswordIcon className='w-5 h-5' />}
            label='Password'
            onChange={(e) => handleChange('password', e.target.value)}
            value={password}
            placeholder='Password'
            color={color}
            type='password'
          />
          <Input
            icon={<UserIcon className='w-5 h-5' />}
            label='User'
            onChange={(e) => handleChange('user', e.target.value)}
            value={user}
            placeholder='User'
            color={color}
            canCopy
          />
        </div>
        <section className='flex flex-col gap-4 pt-6 md:overflow-y-auto h-full relative'>
          <p className='font-semibold'>Security Keys</p>

          <div
            className='py-2 px-4 rounded-xl flex items-center gap-1.5 text-gray-600 sticky'
            style={{ backgroundColor: color + '4D' || '#dddd' }}
          >
            <div>{<KeyIcon />}</div>
            <input
              className={`w-full p-1 rounded outline-none focus:border-blue-500 bg-transparent text-gray-800`}
              placeholder='Add new key'
              value={currentKey}
              onChange={(e) => setCurrentKey(e.target.value)}
            />
            {currentKey.trim() && (
              <button
                onClick={() => handleChange('addKey', currentKey)}
                className='hover:text-gray-700 active:scale-95 transition-all bg-gray-700 rounded-full'
              >
                <AddCircleIcon className=' text-white ' />
              </button>
            )}
          </div>

          <div className='grid gap-2 px-3'>
            {keys.map((key) => (
              <KeyItem
                key={key.value}
                value={key.value}
                checked={key.checked}
                onCheck={() => handleChange('keys', key.value)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className='mt-auto sticky bottom-0 z-20 py-1 bg-white grid md:hidden'>
        <Button
          label={isEditing ? 'Saving...' : 'Save'}
          loading={isEditing}
          disabled={isEditing || !isEnabledButton}
          onClick={handleEdit}
          className=''
        />
      </div>

      <ConfirmModal
        isVisible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        title='Delete record'
        message='Are you sure you want to delete this record?'
        cancelLabel='Cancel'
        onConfirm={handleDelete}
        confirmDisabled={isDeleting}
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        loading={isDeleting}
      />
      <GeneratorModal isVisible={isGeneratorVisible} onClose={() => setIsGeneratorVisible(false)} />
    </NewPage>
  )
}
