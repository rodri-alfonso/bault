import { useParams, useLocation } from 'wouter'
import useFetch from '@/hooks/useFetch'
import { editRecord, getRecordById } from '@/services/records'
import { decrypt, encrypt } from '@/lib/encryption'
import Page from '@/layout/Page'
import Header from '@/components/Header'
import {
	BookmarkIcon,
	BookmarkFilledIcon,
	EarthIcon,
	MailIcon,
	PasswordIcon,
	UserIcon,
} from '@/assets/icons'
import { useEffect, useState } from 'react'
import RecordCard from '@/components/RecordCard'
import Input from '@/theme/Input'
import ColorPicker from '@/components/ColorPicker'
import SpinnerScreen from '@/components/SpinnerScreen'
import Button from '@/theme/Button'
import { Key } from '@/types'
import KeyItem from '@/components/KeyItem'

const MOCK_KEYS = [
	{ value: 'Exlslkjs0sd7ehdsdjkfy78wefnjksdfn9w8efy', checked: false },
	{ value: 'Exlslkjs0sd7ehdsdjkfy78wefnjksdfn9wdowi', checked: false },
	{ value: 'EIvm09sslkjs0sd7ehdsdjkfy78wefnjksdfn9wdowi', checked: false },
]

export default function RecordPage() {
	const [_, navigate] = useLocation()
	const { id } = useParams()
	const { data, isLoading } = useFetch(() => getRecordById(id))
	const [keyCheckedId, setKeyCheckedId] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	const [site, setSite] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')
	const [color, setColor] = useState('')
	const [keys, setKeys] = useState<Key[]>([])
	const [isMarked, setIsMarked] = useState(false)

	const [isEnabledButton, setIsEnabledButton] = useState(false)

	useEffect(() => {
		if (!isLoading && data) {
			setSite(decrypt(data.site))
			setEmail(decrypt(data.email))
			setPassword(decrypt(data.password))
			setUser(decrypt(data.user))
			setColor(data.color)
			// setKeys(data.keys)
			setKeys(MOCK_KEYS)
			setIsMarked(Boolean(data.marked))
		}
	}, [isLoading])

	function toggleKey(keyToChange: string) {

		const updatedKeys = keys.map((key) => {
			return key.value === keyToChange ? { value: key.value, checked: !key.checked } : key
		})

		setKeys(updatedKeys)
		setKeyCheckedId(keyToChange)
	}

	function handleEdit() {
		setIsEditing(true)

		const payload = {
			site: encrypt(site),
			email: encrypt(email),
			password: encrypt(password),
			user: encrypt(user),
			marked: isMarked,
			color,
		}

		editRecord(id, payload).then(() => {
			navigate('/')
		})
	}

	function handleChange(type, payload) {
		if (!data) return

		const TYPE_MAP = {
			site: setSite,
			email: setEmail,
			password: setPassword,
			user: setUser,
			marked: setIsMarked,
			color: setColor,
			keys: toggleKey
		}

		const setter = TYPE_MAP[type]

		setter(payload)

		setIsEnabledButton(
			site === decrypt(data.site) ||
				email === decrypt(data.email) ||
				password === decrypt(data.password) ||
				user === decrypt(data.user) ||
				isMarked === data.marked ||
				color === data.color
		)
	}

	if (isLoading || !data) return <SpinnerScreen />

	return (
		<Page className='flex flex-col gap-4 relative'>
			<Header />

			<section className='absolute right-16 flex items-center top-6'>
				<ColorPicker color={color} setColor={(payload) => handleChange('color', payload)} />
			</section>
			<button
				onClick={() => handleChange('marked', !isMarked)}
				className='absolute right-28 top-6 p-2 bg-gray-50 hover:bg-gray-100 rounded-xl active:scale-95 transition-all'
			>
				{isMarked ? (
					<BookmarkFilledIcon className='w-6 h-6 text-gray-800' />
				) : (
					<BookmarkIcon className='w-6 h-6 text-gray-500' />
				)}
			</button>

			<section className='pt-2'>
				<p className='text-2xl font-medium'>Welcome back,</p>
				<p className='text-gray-500 font-medium'>Let's check your record!</p>
			</section>

			{/* <RecordSimpleCard site={site} user={user} color={color} password={data?.password} /> */}
			<RecordCard record={{ email, site, user, color, password, keys, id, marked: isMarked }} />

			<p className='font-semibold pt-6'>Information</p>
			<div className='grid gap-3 pb-6'>
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
				/>
			</div>

			{Boolean(MOCK_KEYS.length) && (
				<section className='grid gap-4 pb-6'>
					<p className='font-semibold'>Security Keys</p>

					<div className='grid gap-2'>
						{keys.map((key) => (
							<KeyItem key={key.value} checked={key.checked} onCheck={() => handleChange('keys', key.value)}/>
						))}
					</div>
				</section>
			)}

<div className='mt-auto sticky bottom-0 z-20 bg-white grid py-3'>
			<Button
				label={isEditing ? 'Saving...' : 'Save'}
				loading={isEditing}
				disabled={isEditing || !isEnabledButton}
				onClick={handleEdit}
				className=''
				/>
				</div>
		</Page>
	)
}