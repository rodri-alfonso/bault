import { useParams, useLocation } from 'wouter'
import useFetch from '@/hooks/useFetch'
import { deleteRecord, getRecordById } from '@/services/records'
import { decrypt } from '@/lib/encryption'
import Page from '@/layout/Page'
import Header from '@/components/Header'
import { CopyIcon, EarthIcon, MailIcon, PasswordIcon, TickIcon, UserIcon, ViewIcon } from '@/assets/icons'
import { useEffect, useState } from 'react'
import RecordCard from '@/components/RecordCard'
import Input from '@/theme/Input'
import Typography from '@/theme/Typography'
import ColorPicker from '@/components/ColorPicker'
import SpinnerScreen from '@/components/SpinnerScreen'
import RecordSimpleCard from '@/components/RecordSimpleCard'
import Modal from '@/theme/Modal'

export default function RecordPage() {
	const [_, navigate] = useLocation()
	const { id } = useParams()
	const { data, isLoading } = useFetch(() => getRecordById(id))
	const [keyCheckedId, setKeyCheckedId] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const [site, setSite] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')
	const [color, setColor] = useState('')

	useEffect(() => {
		if (!isLoading && data) {
			setSite(decrypt(data.site))
			setEmail(decrypt(data.email))
			setPassword(decrypt(data.password))
			setUser(decrypt(data.user))
			setColor(data.color)
		}
	}, [isLoading])

	function toggleKey(key: string) {
		if (keyCheckedId === key) setKeyCheckedId('')
		else setKeyCheckedId(key)
	}

	const MOCK_KEYS = [
		'Exlslkjs0sd7ehdsdjkfy78wefnjksdfn9w8efy',
		'Exlslkjs0sd7ehdsdjkfy78wefnjksdfn9wdowi',
		'EIvm09sslkjs0sd7ehdsdjkfy78wefnjksdfn9wdowi',
	]

	// const isDisabledButton =
	// 	site !== decrypt(data?.site || '') ||
	// 	email !== decrypt(data?.email || '') ||
	// 	password !== decrypt(data?.password || '') ||
	// 	user !== decrypt(data?.user || '')

	if (isLoading) return <SpinnerScreen />

	return (
		<Page className='flex flex-col gap-4 relative'>
			<Header />

			<section className='absolute right-16 top-6'>
				<ColorPicker color={color} setColor={setColor} />
			</section>

			<section className='pt-2'>
				<p className='text-2xl font-medium'>Welcome back,</p>
				<p className='text-gray-500 font-medium'>Let's check your record!</p>
			</section>

			<RecordSimpleCard site={site} user={user} color={color} />

			<p className='font-semibold pt-6'>Information</p>
			<div className='grid gap-3 pb-6'>
				<Input
					icon={<EarthIcon className='w-5 h-5' />}
					label='Site'
					onChange={(e) => setSite(e.target.value)}
					value={site}
					placeholder='Site'
					color={color}
				/>
				<Input
					icon={<MailIcon className='w-5 h-5' />}
					label='Email'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					placeholder='Email'
					color={color}
				/>
				<Input
					icon={<PasswordIcon className='w-5 h-5' />}
					label='Password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					placeholder='Password'
					color={color}
					type='password'
				/>
				<Input
					icon={<UserIcon className='w-5 h-5' />}
					label='User'
					onChange={(e) => setUser(e.target.value)}
					value={user}
					placeholder='User'
					color={color}
				/>
			</div>

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
							{/* <button className=''>
									<div className='w-6 h-6 rounded-full border border-solid border-gray-800' />
								</button> */}

							<button
								onClick={() => toggleKey(key)}
								className={`active:scale-95 transition-all w-6 overflow-hidden h-6 border-gray-700 rounded-lg border-solid border-2 grid place-items-center
									${keyCheckedId === key ? 'bg-gray-700' : 'bg-white'}
									`}
								// style={{
								// 	borderColor: color || '#11827',
								// }}
							>
								{keyCheckedId === key && (
									// <TickIcon className={`w-full h-full text-gray-700`} style={{ backgroundColor: color + '99' }} />
									<TickIcon className={`w-full h-full text-white bg-gray-700`} />
									// <div className={`w-full h-full text-white`} style={{ backgroundColor: color }} />
								)}
							</button>
							<p
								className={`truncate w-auto max-w-[200px] ${
									keyCheckedId === key ? 'line-through text-gray-300 font-medium' : 'font-medium text-gray-500'
								}`}
							>
								aaksljdhaskjdhzasdsadasdasddasdkljhasdasdasd
							</p>

							<button
								className='ml-auto text-white rounded-full p-1.5 active:scale-95 transition-all z-20 bg-gray-800'
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

			<div className='grid gap-2 sticky bottom-0 z-20 bg-white py-4 shadow-lg'>
				<button
					onClick={() => alert('edit')}
					className='bg-gray-800 text-white rounded-lg p-2 font-medium active:scale-95 transition-all'
					// disabled={!isDisabledButton}
				>
					Edit
				</button>
				{/* <button onClick={() => alert('delete')} className='bg-red-400 rounded-lg p-1 text-sm'>
					Delete
				</button> */}
			</div>
		</Page>
	)
}
