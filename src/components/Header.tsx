import { signOut } from '../stores/auth'
import { authStore } from '../stores/auth'
import { decrypt } from '@/lib/encryption'
import { MenuSquareIcon } from '@/assets/icons'
import { useLocation } from 'wouter'
import { ArrowRightIcon } from '@/assets/icons'

export default function Header() {
	const { user } = authStore()
	const [location, navigation] = useLocation()

	const isCreatorPath = location === '/create'

	return (
		<header className='flex items-center justify-between'>
			{isCreatorPath ? (
				<button
					className='text-gray-900 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 active:scale-95 transition-all'
					onClick={() => navigation('/')}
				>
					<ArrowRightIcon className='rotate-180' />
				</button>
			) : (
				<button className='text-gray-900 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 active:scale-95 transition-all'>
					<MenuSquareIcon />
				</button>
			)}

			<button onClick={signOut}>
				<img src={decrypt(user?.picture ?? '')} alt='' className='rounded-full grid place-items-center w-9 h-9' />
			</button>
		</header>
	)
}
