import Input from '../theme/Input'
import { useState } from 'react'
import { encrypt } from '../lib/encryption'
import { addRecord } from '../services/records'
import type { Register } from 'types'
import { useLocation } from 'wouter'
import { CARDS_COLORS } from '@/lib/colors'
import { EarthIcon, MailIcon, PasswordIcon, UserIcon, KeyIcon, AddCircleIcon } from '@/assets/icons'

export default function FormCreator() {
	const [site, setSite] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')
	const [keys, setKeys] = useState<string[]>([])
	const [currentKey, setCurrentKey] = useState('')

	const [_, navigate] = useLocation()

	const randomColor = CARDS_COLORS[Math.floor(Math.random() * CARDS_COLORS.length)]
	const isEmptyForm = !site || !email || !password || !user

	const handleClick = () => {
		if (isEmptyForm) return

		const payload: Register = {
			email: encrypt(email),
			password: encrypt(password),
			site: encrypt(site),
			user: encrypt(user),
			keys: [],
			color: randomColor,
		}

		addRecord(payload).then(() => {
			navigate('/')
		})
	}

	function handleAddKey() {
		if (!currentKey) return

		setKeys([...keys, currentKey])
		setCurrentKey('')
	}

	function handleDeleteKey(key: string) {
		setKeys(keys.filter((k) => k !== key))
	}

	return (
		<>
			<section className='grid gap-6'>
				<Input
					icon={<EarthIcon />}
					label='Site'
					onChange={(e) => setSite(e.target.value)}
					value={site}
					placeholder='Site'
				/>
				<Input
					icon={<MailIcon />}
					label='Email'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					placeholder='Email'
				/>
				<Input
					icon={<PasswordIcon />}
					label='Password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					placeholder='Password'
					type='password'
				/>
				<Input
					icon={<UserIcon />}
					label='User'
					onChange={(e) => setUser(e.target.value)}
					value={user}
					placeholder='User'
				/>

				<div className='bg-blue-50 p-3 px-4 rounded-xl flex items-center gap-1.5 text-gray-400'>
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

				<section className='flex items-center gap-2 flex-wrap'>
					{keys.map((key, index) => (
						<span
							className='bg-gray-100 rounded-full px-2 pl-2.5 py-1 flex items-center justify-between w-fit gap-2'
							key={key + index}
						>
							{key}
							<button
								onClick={() => handleDeleteKey(key)}
								className='rotate-45 text-gray-400 hover:text-gray-900 active:scale-95 transition-all'
							>
								{<AddCircleIcon />}
							</button>
						</span>
					))}
				</section>
			</section>
			<button
				className='bg-gray-900 text-white mt-auto rounded-lg p-2 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed'
				onClick={handleClick}
				disabled={isEmptyForm}
			>
				Create
			</button>
		</>
	)
}
