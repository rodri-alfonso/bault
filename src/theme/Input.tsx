interface Props {
	label: string
	placeholder: string
	value: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ label, onChange, placeholder, value }: Props) {
	return (
		<div>
			<label className='block mb-1 text-sm font-bold text-gray-700'>{label}</label>
			<input
				className='w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				type='text'
			/>
		</div>
	)
}
