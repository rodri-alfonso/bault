import Page from '../layout/Page'
import FormCreator from '../components/FormCreator'
import { Link } from 'wouter'

export default function CreatorPage() {
	return (
		<Page className='flex flex-col justify-between'>
			<header className=''>
				<Link to='/' className='w-16 py-2 bg-blue-400 rounded-md transition-all'>
					Go back
				</Link>
			</header>
			<FormCreator />
		</Page>
	)
}
