import { signOut } from '../stores/auth'
import { authStore } from '../stores/auth'
import { decrypt } from '@/lib/encryption'
import { MenuSquareIcon } from '@/assets/icons'
import { useLocation } from 'wouter'
import { ArrowRightIcon, DeleteIcon } from '@/assets/icons'
import Modal from '@/theme/Modal'
import { useState } from 'react'
import { deleteRecord } from '@/services/records'
import Button from '@/theme/Button'

interface IconButtonProps {
	children: React.ReactNode | React.ReactNode[]
	onClick: () => void
}

export default function Header() {
	const { user } = authStore()
	const [location, navigation] = useLocation()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const isCreatorPath = location === '/create'
	const isRecordPath = location.includes('record/')

	const IconButton = ({ children, onClick }: IconButtonProps) => {
		return (
			<button
				onClick={onClick}
				className='text-gray-500 p-2 bg-gray-50 rounded-lg hover:text-gray-800 hover:bg-gray-100 active:scale-95 transition-all'
			>
				{children}
			</button>
		)
	}

	function handleLogout() {
		signOut()
		setIsModalVisible(false)
	}

	function handleDelete() {
		setIsDeleting(true)
		const locationId = location.split('/')[2]
		deleteRecord(locationId).then(() => navigation('/'))
	}

	return (
		<header className='flex items-center justify-between'>
			{isCreatorPath || isRecordPath ? (
				<button
					className='text-gray-900 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 active:scale-95 transition-all'
					onClick={() => navigation('/')}
				>
					<ArrowRightIcon className='rotate-180' />
				</button>
			) : (
				<button
					onClick={() => setIsModalVisible(true)}
					className='text-gray-900 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 active:scale-95 transition-all'
				>
					<MenuSquareIcon />
				</button>
			)}

			{!isCreatorPath && !isRecordPath && (
				<img src={decrypt(user?.picture ?? '')} alt='' className='rounded-full grid place-items-center w-9 h-9' />
			)}

			{isRecordPath && (
				<section className='flex gap-2'>
					<IconButton onClick={() => setIsDeleteModalVisible(true)}>
						<DeleteIcon />
					</IconButton>
				</section>
			)}

			<Modal isVisible={isModalVisible}>
				<div className='flex flex-col gap-4 rounded-xl bg-white p-6 m-2'>
					<div className='text-center'>
						<h1 className='text-xl font-semibold'>Logout</h1>
						<p>Are you sure you want to log out?</p>
					</div>

					<div className='grid gap-2'>
						<button
							onClick={handleLogout}
							className='text-sm text-white font-medium bg-gray-800 rounded-lg  p-1.5 active:scale-95 transition-all'
						>
							Logout
						</button>
						<button
							onClick={() => setIsModalVisible(false)}
							className='text-sm font-medium text-gray-800 p-1.5 active:scale-95 rounded-lg transition-all border border-solid border-gray-400 hover:border-gray-800'
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
			<Modal isVisible={isDeleteModalVisible}>
				<div className='flex flex-col gap-4 rounded-xl bg-white p-6 m-2'>
					<div className='text-center'>
						<h1 className='text-xl font-semibold'>Delete</h1>
						<p>Are you sure you want to delete this record?</p>
					</div>

					<div className='grid gap-2'>
						<Button
							onClick={handleDelete}
							disabled={isDeleting}
							label={isDeleting ? 'Deleting...' : 'Delete'}
							loading={isDeleting}
						/>

						<button
							onClick={() => setIsDeleteModalVisible(false)}
							className='text-sm font-medium text-gray-800 p-1.5 active:scale-95 rounded-lg transition-all border border-solid border-gray-400 hover:border-gray-800'
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</header>
	)
}
