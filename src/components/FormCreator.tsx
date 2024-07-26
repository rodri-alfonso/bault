import Input from '../theme/Input'
import { useState } from 'react'
import { encrypt } from '../lib/encryption'
import { addRecord } from '../services/records'
import type { Register } from 'types'
import { useLocation } from 'wouter'
import { CARDS_COLORS } from '@/lib/colors'

const randomColor = CARDS_COLORS[Math.floor(Math.random() * CARDS_COLORS.length)]

export default function FormCreator() {
	const [site, setSite] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')

	const [_, navigate] = useLocation()

	const handleClick = () => {
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

	return (
		<>
			<section className='grid gap-6'>
				<Input label='Sitio' onChange={(e) => setSite(e.target.value)} value={site} placeholder='placeholder' />
				<Input label='Usuario' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='placeholder' />
				<Input
					label='Contraseña'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					placeholder='placeholder'
					type='password'
				/>
				<Input label='User' onChange={(e) => setUser(e.target.value)} value={user} placeholder='placeholder' />
			</section>
			<button className='bg-blue-400 rounded-lg p-2 active:scale-95 transition-all' onClick={handleClick}>
				Create
			</button>
		</>
	)
}
