import { signOut } from '../stores/auth'
import { authStore } from '../stores/auth'
import { decrypt } from '@/lib/encryption'

export default function Header() {
	const { user } = authStore()

	return (
		<header className='flex items-center justify-between'>
			<p>Welcome, {decrypt(user?.name ?? '')} </p>

			<button onClick={signOut}>
				<img src={decrypt(user?.picture ?? '')} alt='' className='rounded-full grid place-items-center w-8 h-8' />
			</button>
		</header>
	)
}
