import { ViewOffIcon, ViewIcon } from '@/assets/icons'
import { useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	icon?: React.ReactNode
	color?: string
}

export default function Input({ onChange, placeholder, value, icon, type = 'text', color, ...props }: Props) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	function togglePasswordVisibility() {
		setIsPasswordVisible((prev) => !prev)
	}

	const PasswordButton = () => {
		return (
			<button onClick={togglePasswordVisibility} className='active:scale-95 transition-all'>
				{isPasswordVisible ? <ViewIcon className='w-5 h-5' /> : <ViewOffIcon className='w-5 h-5' />}
			</button>
		)
	}

	return (
		<div
			className={`py-2 px-4 rounded-xl flex items-center gap-1.5 text-gray-600`}
			style={{ backgroundColor: color + '4D' || '#dddd' }}
		>
			<div className='text-gray-600'>{icon}</div>
			<input
				className={`w-full p-1 rounded outline-none focus:border-blue-500 bg-transparent text-gray-800`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				type={isPasswordVisible ? 'text' : type}
				{...props}
			/>
			{type === 'password' && <PasswordButton />}
		</div>
	)
}
