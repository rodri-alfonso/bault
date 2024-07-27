import Header from '../components/Header'
import Page from '../layout/Page'
import { Link } from 'wouter'
import { getRecords } from '@/services/records'
import useFetch from '@/hooks/useFetch'
import RecordCard from '@/components/RecordCard'
import Typography from '@/theme/Typography'
import { authStore } from '@/stores/auth'
import { decrypt } from '@/lib/encryption'
import { ArrowRightIcon, Notebookcon } from '@/assets/icons'
import Record from '@/components/Reacord'
import Navbar from '@/components/Navbar'

export default function HomePage() {
	const { user } = authStore()
	const { data, isLoading } = useFetch(getRecords)

	console.log('🚀 ~ data:', data)

	if (isLoading) return <p>Loading...</p>
	// if (!data?.length) return <p>No records</p>

	const firstName = decrypt(user?.name ?? '').split(' ')[0]

	return (
		<Page className='flex flex-col justify-between gap-4'>
			<Header />
			<section className='pt-2'>
				<p className='text-2xl font-medium'>{`Hello ${firstName},`}</p>
				<p className='text-gray-500 font-medium'>Let's check your bault!</p>
			</section>

			<div className='py-2'>
				{/* <p className='text-lg font-medium pb-4'>Favorite records</p> */}
				<section className='slides'>
					{data?.map((record) => (
						<RecordCard record={record} key={record.email} />
					))}
				</section>
			</div>

			<div className='flex items-center justify-between'>
				<p className='text-lg font-medium'>Last records</p>
				<button className='p-2 rounded-lg hover:bg-gray-100 transition-all active:scale-95'>
					<ArrowRightIcon />
				</button>
				{/* <Notebookcon className='text-gray-600' /> */}
			</div>

			<section className='grid gap-2 overflow-y-auto'>
				{data?.map((record) => (
					<Record {...record} key={record.id} />
				))}
			</section>

			<Navbar />
		</Page>
	)
}
