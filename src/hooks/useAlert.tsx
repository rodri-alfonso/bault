import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function useAlert() {
	const [showAlert, setShowAlert] = useState(false)
	console.log('🚀 ~ showAlert:', showAlert)

	useEffect(() => {
		if (showAlert) {
			const timeout = setTimeout(() => {
				setShowAlert(false)
				console.log('🚀 ~ se jueeee:')
			}, 3000)

			return () => clearTimeout(timeout)
		}
	}, [showAlert])

	function setAlert(message: string) {
		setShowAlert(true)
		console.log('message', message)

		const alertRoot = document.getElementById('alert-root') as DocumentFragment | Element

		createPortal(
			<div className='absolute h-full top-0 w-full bg-gray-800 bg-opacity-80 grid place-items-center z-50 transition-all'>
				<div className='bg-orange-400 p-4'>{message}</div>
			</div>,
			alertRoot
		)
	}

	return { setAlert }
}
