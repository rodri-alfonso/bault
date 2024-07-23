interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

export default function Input({ label, onChange, placeholder, value, className, type = 'text', ...props }: Props) {
	return (
		<div>
			<label className='block mb-1 text-sm font-bold text-gray-700'>{label}</label>
			<input
				className={`w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500 ${className}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				type={type}
				{...props}
			/>
		</div>
	)
}
