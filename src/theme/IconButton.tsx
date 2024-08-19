interface Props {
	className?: string
	disabled?: boolean
	icon: React.ReactNode | React.ReactNode[]
	label?: string
	loading?: boolean
	type?: 'primary' | 'secondary'
}

export default function IconButton({ icon, type = 'primary', label, loading, ...props }: Props) {
	return (
		<button className='flex items-center justify-center gap-2' {...props}>
			{loading ? <span>loading...</span> : icon}
		</button>
	)
}
