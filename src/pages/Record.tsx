import { useParams, useLocation } from 'wouter'
import useFetch from '@/hooks/useFetch'
import { getRecordById } from '@/services/records'
import { decrypt, encrypt } from '@/lib/encryption'
import Page from '@/layout/Page'
import Header from '@/components/Header'
import {
	BookmarkIcon,
	BookmarkFilledIcon,
	CopyIcon,
	EarthIcon,
	MailIcon,
	PasswordIcon,
	TickIcon,
	UserIcon,
} from '@/assets/icons'
import { useEffect, useState } from 'react'
import RecordCard from '@/components/RecordCard'
import Input from '@/theme/Input'
import ColorPicker from '@/components/ColorPicker'
import SpinnerScreen from '@/components/SpinnerScreen'
import Button from '@/theme/Button'

export default function RecordPage() {
	const [_, navigate] = useLocation()
	const { id } = useParams()
	const { data, isLoading } = useFetch(() => getRecordById(id))
	const [keyCheckedId, setKeyCheckedId] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const [site, setSite] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')
	const [color, setColor] = useState('')
	const [keys, setKeys] = useState<string[]>([])
	const [isMarked, setIsMarked] = useState(false)

	const [isEnabledButton, setIsEnabledButton] = useState(false)

	useEffect(() => {
		if (!isLoading && data) {
			setSite(decrypt(data.site))
			setEmail(decrypt(data.email))
			setPassword(decrypt(data.password))
			setUser(decrypt(data.user))
			setColor(data.color)
			setKeys(data.keys)

			// setIsEnabledButton(isEnabledButton)
		}
	}, [isLoading])

	// useEffect(() => {
	// 	if (!isLoading && data) {
	// 		const isEnabledButton =
	// 			site === decrypt(data.site) ||
	// 			email === decrypt(data.email) ||
	// 			password === decrypt(data.password) ||
	// 			user === decrypt(data.user)

	// 		setIsEnabledButton(isEnabledButton)
	// 	}
	// }, [site, email, password, user])

	function toggleKey(key: string) {
		if (keyCheckedId === key) setKeyCheckedId('')
		else setKeyCheckedId(key)
	}

	const MOCK_KEYS = [
		'Exlslkjs0sd7ehdsdjkfy78wefnjksdfn9w8efy',
		'Exlslkjs0sd7ehdsdjkfy78wefnjksdfn9wdowi',
		'EIvm09sslkjs0sd7ehdsdjkfy78wefnjksdfn9wdowi',
	]

	function handleEdit() {
		setIsEditing(true)

		const payload = {
			site: encrypt(site),
			email: encrypt(email),
			password: encrypt(password),
			user: encrypt(user),
			marked: isMarked,
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
		}

		const setter = TYPE_MAP[type]

		setter(payload)
		console.log('TYPE: ', type, payload)

		setIsEnabledButton(
			site === decrypt(data.site) ||
				email === decrypt(data.email) ||
				password === decrypt(data.password) ||
				user === decrypt(data.user)
		)
	}

	if (isLoading || !data) return <SpinnerScreen />

	return (
		<Page className='flex flex-col gap-4 relative'>
			<Header />

			<section className='absolute right-16 flex items-center top-6'>
				<ColorPicker color={color} setColor={setColor} />
			</section>
			<button
				onClick={() => setIsMarked(!isMarked)}
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
			<RecordCard record={{ email, site, user, color, password, keys, id }} />

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

			{Boolean(keys.length) && (
				<section className='grid gap-4 pb-6'>
					<p className='font-semibold'>Security Keys</p>

					<div className='grid gap-2'>
						{MOCK_KEYS.map((key) => (
							<div
								key={key}
								className={`h-10 flex items-center text-gray-400 gap-3 w-full ${
									keyCheckedId === key ? 'justify-start' : ''
								}`}
							>
								<button
									onClick={() => toggleKey(key)}
									className={`active:scale-95 transition-all w-6 overflow-hidden h-6 border-gray-700 rounded-lg border-solid border-2 grid place-items-center
									${keyCheckedId === key ? 'bg-gray-700' : 'bg-white'}
									`}
									// style={{
									// 	borderColor: color || '#11827',
									// }}
								>
									{keyCheckedId === key && <TickIcon className={`w-full h-full text-white bg-gray-700`} />}
								</button>
								<p
									className={`truncate w-auto max-w-[200px] ${
										keyCheckedId === key ? 'line-through text-gray-300 font-medium' : 'font-medium text-gray-500'
									}`}
								>
									aaksljdhaskjdhzasdsadasdasddasdkljhasdasdasd
								</p>

								<button
									className='ml-auto text-white rounded-full p-2 active:scale-95 transition-all z-20 bg-gray-800'
									// style={{
									// 	backgroundColor: color + '66',
									// }}
								>
									<CopyIcon className='w-5 h-5' />
								</button>
							</div>
						))}
					</div>
				</section>
			)}

			<Button
				label={isEditing ? 'Editing...' : 'Edit'}
				loading={isEditing}
				disabled={isEditing || !isEnabledButton}
				onClick={handleEdit}
				className='mt-auto sticky bottom-0 z-20'
			/>
		</Page>
	)
}
