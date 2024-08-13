import Modal from '@/theme/Modal'
import { useState } from 'react'

export default function ModalLogout() {
	const [isModalVisible, setIsModalVisible] = useState(false)

	return (
		<Modal isVisible={isModalVisible}>
			<div className='flex flex-col gap-4'>
				<h1 className='text-xl font-semibold'>Logout</h1>
				<p className='text-sm'>Are you sure you want to logout?</p>
				<div className='flex gap-4'>
					<button onClick={() => setIsModalVisible(false)} className='text-sm text-gray-500'>
						Cancel
					</button>
					<button onClick={() => setIsModalVisible(false)} className='text-sm text-red-500'>
						Logout
					</button>
				</div>
			</div>
		</Modal>
	)
}
