import { RegisterWithId } from '@/services/records'
import { useLocation } from 'wouter'
import { decrypt } from '@/lib/encryption'
import { CopyIcon, ViewIcon } from '@/assets/icons'
import { useState } from 'react'
import Alert from '@/theme/Alert'
import Confetti from 'canvas-confetti'

export default function Record({ id, site, user, color, password }: RegisterWithId) {
	const [_, navigate] = useLocation()
	const [isAlertVisible, setIsAlertVisible] = useState(false)

	function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
		if (isAlertVisible) return

		e.stopPropagation()
		e.preventDefault()

		navigator.clipboard.writeText(decrypt(password))
		Confetti({
			ticks: 80,
			origin: { x: 0.5, y: 0.25 },
			spread: 80,
			zIndex: -20,
		})

		setIsAlertVisible(true)
	}

	return (
		<article
			className={`border-2 border-solid borde-gray-200 rounded-2xl h-16 p-1 pr-3 flex items-center justify-between transition-all hover:bg-gray-50`}
			style={{}}
		>
			<button
				className='flex items-center h-full gap-6 cursor-pointer w-full'
				onClick={() => navigate(`/record/${id}`)}
			>
				<p
					style={{
						backgroundColor: color,
					}}
					className='grid place-items-center h-full w-12 rounded-2xl text-gray-800 text-lg font-semibold '
				>
					{decrypt(site)[0].toUpperCase()}
				</p>
				<div className='text-left'>
					<p className='font-semibold'>{decrypt(site)}</p>
					<p className='-mt-1 font-medium text-sm text-gray-400 truncate w-36'>{decrypt(user)}</p>
				</div>
			</button>

			<button
				onClick={handleCopy}
				className='bg-gray-800 text-white rounded-xl p-2 active:scale-95 transition-all z-20'
			>
				<CopyIcon className='w-5 h-5' />
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
