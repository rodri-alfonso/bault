import { ViewOffIcon, ViewIcon } from '@/assets/icons'
import { useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	icon?: React.ReactNode
}

export default function Input({ onChange, placeholder, value, icon, type = 'text', ...props }: Props) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	function togglePasswordVisibility() {
		setIsPasswordVisible((prev) => !prev)
	}

	const PasswordButton = () => {
		if (isPasswordVisible)
			return (
				<button onClick={togglePasswordVisibility}>
					<ViewIcon />
				</button>
			)
		else
			return (
				<button onClick={togglePasswordVisibility}>
					<ViewOffIcon />
				</button>
			)
	}

	return (
		<div className='bg-blue-50 p-3 px-4 rounded-xl flex items-center gap-1.5 text-gray-400'>
			<div>{icon}</div>
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
