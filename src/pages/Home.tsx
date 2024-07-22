import Page from '../layout/Page'
import { Link } from 'wouter'

export default function HomePage() {
	return (
		<Page className='flex flex-col justify-between'>
			<h1>Hello, im the home page</h1>
			<Link to='/create' className='bg-blue-300 rounded-md px-3 py-2 active:scale-95 transition-all'>
				Create
			</Link>
		</Page>
	)
}
