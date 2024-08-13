import { decrypt } from '@/lib/encryption'
import { RegisterWithId } from '@/services/records'
import { useLocation } from 'wouter'
import { ViewIcon } from '@/assets/icons'
import Typography from '@/theme/Typography'
import Alert from '@/theme/Alert'
import { useState } from 'react'

interface Props {
	record: RegisterWithId
}

export default function RecordCard({ record }: Props) {
	const [_, navigate] = useLocation()
	const [isAlertVisible, setIsAlertVisible] = useState(false)

	function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
		if (isAlertVisible) return

		e.stopPropagation()
		e.preventDefault()

		const password = decrypt(record.password)
		navigator.clipboard.writeText(password)

		setIsAlertVisible(true)
	}

	function handleNavigate() {
		navigate(`/record/${record.id}`)
	}

	return (
		<article
			style={{
				backgroundColor: record.color || 'whitesmoke',
			}}
			className='rounded-3xl p-7 flex items-center justify-between shadow-lg max-w-[380px] min-w-[310px] active:scale-95 transition-all cursor-pointer'
			onClick={handleCopy}
		>
			<div className='flex items-center gap-4'>
				<div className='grid place-items-center w-10 h-10 bg-gray-900 rounded-full text-white'>
					<Typography text={decrypt(record.site)[0].toUpperCase()} className='text-lg font-semibold' />
				</div>

				<div className='grid w-10'>
					<p className='font-semibold'>{decrypt(record.site)}</p>
					<p className='text-sm text-gray-700 -mt-1.5 truncate w-32 '>{decrypt(record.user)}</p>
				</div>
			</div>

			<button
				onClick={handleNavigate}
				className='text-white p-2 shadow-sm rounded-xl bg-gray-800 active:scale-95 transition-all '
			>
				<ViewIcon />
			</button>
			<Alert
				isVisible={isAlertVisible}
				message='Copied to clipboard!'
				onClose={() => setIsAlertVisible(false)}
				isEphemeral
			/>
		</article>
	)
}
