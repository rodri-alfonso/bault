import Header from '../components/Header'
import Page from '../layout/Page'
import { Link } from 'wouter'
import { getRecords } from '@/services/records'
import useFetch from '@/hooks/useFetch'
import RecordCard from '@/components/RecordCard'

export default function HomePage() {
	const { data, isLoading, refetch } = useFetch(getRecords)
	console.log('🚀 ~ data:', data)

	if (isLoading) return <p>Loading...</p>
	// if (!data?.length) return <p>No records</p>

	return (
		<Page className='flex flex-col justify-between'>
			<Header />
			<div>
				{data?.map((record) => (
					<RecordCard record={record} key={record.email} onDelete={refetch} />
				))}
			</div>
			<Link to='/create' className='bg-blue-300 rounded-md px-3 py-2 active:scale-95 transition-all'>
				Create
			</Link>
		</Page>
	)
}
