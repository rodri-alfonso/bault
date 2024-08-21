import Input from '../theme/Input'
import { useState } from 'react'
import { encrypt } from '../lib/encryption'
import { addRecord } from '../services/records'
import type { Register, Key } from 'types'
import { useLocation } from 'wouter'
import { CARDS_COLORS } from '@/lib/colors'
import { EarthIcon, MailIcon, PasswordIcon, UserIcon, KeyIcon, AddCircleIcon } from '@/assets/icons'
import Typography from '@/theme/Typography'
import Button from '@/theme/Button'
import ColorPicker from './ColorPicker'

const randomColor = CARDS_COLORS[Math.floor(Math.random() * CARDS_COLORS.length)]

export default function FormCreator() {
	const [site, setSite] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')
	const [keys, setKeys] = useState<Key[]>([])
	const [currentKey, setCurrentKey] = useState('')
	const [color, setColor] = useState(randomColor)

	const [loading, setLoading] = useState(false)

	const [_, navigate] = useLocation()

	const isEmptyForm = !site || !email || !password || !user

	const handleClick = () => {
		if (isEmptyForm) return

		setLoading(true)

		const payload: Register = {
			email: encrypt(email),
			password: encrypt(password),
			site: encrypt(site),
			user: encrypt(user),
			marked: false,
			keys: keys.map((key)=> ({...key, value: encrypt(key.value)})),
			color: color,
		}

		addRecord(payload).then(() => {
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
		<>
			<div className='absolute top-6 right-4 '>
				<ColorPicker color={color} setColor={setColor} />
			</div>
			<article
				style={{
					backgroundColor: color,
				}}
				className='rounded-3xl p-7 flex items-center justify-between shadow-lg'
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

			<section className='grid gap-3 pb-6'>
				<p className='font-semibold pt-6 pb-1'>Information</p>
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
						<button onClick={handleAddKey} className='hover:text-gray-800 active:scale-95 transition-all'>
							<AddCircleIcon />
						</button>
					)}
				</div>

				<section className='flex items-center gap-3 flex-wrap pt-2'>
					{keys.map((key, index) => (
						<span
							className='bg-gray-100 rounded-full px-2 pl-2.5 py-1  max-w-xs flex items-center justify-between gap-2'
							key={key.value + index}
						>
							<div className='truncate'>{key.value}</div>
							<button
								onClick={() => handleDeleteKey(key.value)}
								className='rotate-45 text-gray-400 hover:text-gray-900 active:scale-95 transition-all'
							>
								{<AddCircleIcon />}
							</button>
						</span>
					))}
				</section>
			</section>

			<div className='mt-auto sticky bottom-0 z-20 grid py-3 bg-white'>
				<Button label={'Create'} onClick={handleClick} disabled={loading || isEmptyForm} loading={loading} />
			</div>
		</>
	)
}
