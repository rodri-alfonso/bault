import Page from '../layout/Page'
import FormCreator from '../components/FormCreator'
import { Link } from 'wouter'
import Header from '@/components/Header'

export default function CreatorPage() {
	return (
		<Page className='flex flex-col gap-8'>
			<Header />
			<section>
				<p className='text-2xl font-medium'>Welcome back,</p>
				<p className='text-gray-500 font-medium'>Let's create a new record!</p>
			</section>
			<FormCreator />
		</Page>
	)
}
