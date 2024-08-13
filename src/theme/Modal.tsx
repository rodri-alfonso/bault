import { createPortal } from 'react-dom'

interface Props {
	children: React.ReactNode | React.ReactNode[]
	isVisible: boolean
}

export default function Modal({ children, isVisible }: Props) {
	if (!isVisible) return null

	const modalRoot = document.getElementById('modal-root') as DocumentFragment | Element

	return createPortal(
		<div className='absolute h-full top-0 w-full bg-gray-800 bg-opacity-80 grid place-items-center z-50 transition-all'>
			{children}
		</div>,
		modalRoot
	)
}
