import { decrypt } from '@/lib/encryption'
import { RegisterWithId } from '@/services/records'
import { useLocation } from 'wouter'
import { CopyIcon } from '@/assets/icons'
import Typography from '@/theme/Typography'
import Alert from '@/theme/Alert'
import { useState } from 'react'
import confetti from 'canvas-confetti'

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

		navigator.clipboard.writeText(record.password)
		confetti({
			ticks: 80,
			origin: { x: 0.5, y: 0.25 },
			spread: 80,
			zIndex: -20,
		})

		setIsAlertVisible(true)
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
					<Typography text={record.site[0]?.toUpperCase()} className='text-lg font-semibold' />
				</div>

				<div className='grid w-10'>
					<p className='font-semibold'>{record.site}</p>
					<p className='text-sm text-gray-700 -mt-1.5 truncate w-32 '>{record.user}</p>
				</div>
			</div>

			<div className='text-white p-2 shadow-sm rounded-xl bg-gray-800 active:scale-95 transition-all'>
				<CopyIcon />
			</div>
			<Alert
				isVisible={isAlertVisible}
				message='Copied to clipboard!'
				onClose={() => setIsAlertVisible(false)}
				isEphemeral
			/>
		</article>
	)
}
