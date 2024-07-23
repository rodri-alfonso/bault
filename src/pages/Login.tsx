import { signIn } from '../stores/auth'

export default function LoginPage() {
	return (
		<div>
			<h1>I'm the LoginPage</h1>
			<button onClick={signIn} className='bg-blue-200 p-2 rounded-md'>
				Login
			</button>
		</div>
	)
}
