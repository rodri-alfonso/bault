import { signOut } from '../stores/auth'
import { authStore } from '../stores/auth'
import { decrypt } from '@/lib/encryption'
import { MenuSquareIcon } from '@/assets/icons'

export default function Header() {
	const { user } = authStore()

	return (
		<header className='flex items-center justify-between'>
			<button className='text-gray-900 p-2 bg-gray-100 rounded-md hover:bg-gray-200 active:scale-95 transition-all'>
				<MenuSquareIcon />
			</button>

			<button onClick={signOut}>
				<img src={decrypt(user?.picture ?? '')} alt='' className='rounded-full grid place-items-center w-9 h-9' />
			</button>
		</header>
	)
}
