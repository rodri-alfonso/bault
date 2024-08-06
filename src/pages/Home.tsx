import Header from '../components/Header'
import Page from '../layout/Page'
import { getRecords } from '@/services/records'
import useFetch from '@/hooks/useFetch'
import { authStore } from '@/stores/auth'
import { decrypt } from '@/lib/encryption'
import { ArrowRightIcon } from '@/assets/icons'
import Record from '@/components/Reacord'
import Navbar from '@/components/Navbar'
import RecordsSlider from '@/components/RecordsSlider'

export default function HomePage() {
	const { user } = authStore()
	const { data, isLoading } = useFetch(getRecords)

	const firstName = decrypt(user?.name ?? '').split(' ')[0]

	const isLoadingData = !data?.length && isLoading

	return (
		<Page className='flex flex-col gap-4'>
			<Header />
			<section className='pt-2'>
				<p className='text-2xl font-medium'>{`Hello ${firstName},`}</p>
				<p className='text-gray-500 font-medium'>Let's check your bault!</p>
			</section>

			{isLoadingData ? (
				<div className='w-full bg-gray-200 rounded-3xl py-12  mb-auto' />
			) : (
				<RecordsSlider records={data || []} />
			)}

			<div className='flex items-center justify-between'>
				<p className='text-lg font-medium'>Last records</p>
				{isLoadingData ? (
					<div />
				) : (
					<button className='p-2 rounded-lg hover:bg-gray-100 transition-all active:scale-95'>
						<ArrowRightIcon />
					</button>
				)}
			</div>

			<section className='grid gap-2 overflow-y-auto mb-auto'>
				{isLoadingData ? (
					<>
						<div className='w-full bg-gray-200 rounded-xl py-8' />
						<div className='w-full bg-gray-200 rounded-xl py-8' />
						<div className='w-full bg-gray-200 rounded-xl py-8' />
						<div className='w-full bg-gray-200 rounded-xl py-8' />
					</>
				) : (
					data?.map((record) => <Record {...record} key={record.id} />)
				)}
			</section>

			<Navbar />
		</Page>
	)
}
