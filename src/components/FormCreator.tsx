import Input from '../theme/Input'
import { useState } from 'react'
import { encrypt } from '../lib/encryption'

export default function FormCreator() {
	const [input, setInput] = useState('')

	const handleClick = () => {
		const encrypted = encrypt(input)
		console.log(encrypted)
	}

	return (
		<>
			<section className='grid gap-6'>
				<Input label='Sitio' onChange={(e) => setInput(e.target.value)} value={input} placeholder='placeholder' />
				<Input label='Usuario' onChange={(e) => setInput(e.target.value)} value={input} placeholder='placeholder' />
				<Input label='Contraseña' onChange={(e) => setInput(e.target.value)} value={input} placeholder='placeholder' />
				<Input label='Keys' onChange={(e) => setInput(e.target.value)} value={input} placeholder='placeholder' />
			</section>
			<button className='bg-blue-400 rounded-lg p-2 active:scale-95 transition-all' onClick={handleClick}>
				Create
			</button>
		</>
	)
}
