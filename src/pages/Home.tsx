import Header from '../components/Header'
import { authStore } from '@/stores/auth'
import { PlusIcon, LicenseIcon, Bookmark01Icon } from '@/assets/icons'
import Record from '@/components/Reacord'
import RecordsSlider from '@/components/RecordsSlider'
import { useLocation } from 'wouter'
import { useState } from 'react'
import FavouritesModal from '@/components/Modals/Favourites'
import { BookmarkedRecord } from '@/components/Modals/Favourites'
import { useRecord } from '@/hooks/useRecords'
import NewPage from '@/layout/NewPage'
import StatCard from '@/components/StatCard'
import Heading from '@/components/Heading'
import Tooltip from '@/theme/Tooltip'

export default function HomePage() {
  const { user } = authStore()
  // const { isLoading, records, refetch } = useRecord()
  const { isLoading, records, refetch } = useRecord()
  const [isFavouritesModalOpen, setIsFavouritesModalOpen] = useState(false)
  const [_, navigate] = useLocation()

  const [firstName] = (user?.name || '').split(' ')
  const isLoadingData = !records?.length && isLoading

  return (
    <NewPage className='grid h-screen items-start content-baseline'>
      <Header className='px-4 md:hidden' />
      <section className='pt-2 px-4 md:pt-6 flex w-full justify-between items-start'>
        <Heading title={`Hello ${firstName},`} subtitle="Let's check your bault!" />

        <div className='hidden md:flex items-center gap-2'>
          <Tooltip content={`Records`} direction='bottom'>
            <StatCard count={records?.length || 0} icon={<LicenseIcon className='w-5' />} label='Records' primary />
          </Tooltip>
          <Tooltip content={`Bookmarks`} direction='bottom'>
            <StatCard
              count={records?.filter((record) => record.marked).length || 0}
              icon={<Bookmark01Icon className='w-5' />}
              label='Bookmarks'
            />
          </Tooltip>
        </div>
      </section>
      {isLoadingData ? (
        <div className='bg-gray-200 rounded-3xl py-11 mt-4 max-w-[310px] mb-6 ml-4' />
      ) : (
        <div className='pt-2 md:max-w-[888px]'>
          <p className='md:block hidden text-lg font-medium md:font-semibold pb-2 px-4'>Bookmarks</p>
          <RecordsSlider records={records?.filter((record) => record.marked) || []} />
        </div>
      )}

      <div className='flex items-center justify-between px-4'>
        <p className='text-lg font-medium md:font-semibold'>Last records</p>

        <div className='flex items-center gap-2'>
          {Boolean(records?.length) && (
            <button
              onClick={() => setIsFavouritesModalOpen(true)}
              className='md:hidden p-2 rounded-xl hover:bg-gray-200 transition-all active:scale-95 bg-gray-100'
            >
              <Bookmark01Icon className='' />
            </button>
          )}
          <button
            onClick={() => navigate('/create')}
            className='p-2 rounded-xl hover:bg-gray-200  transition-all active:scale-95 bg-gray-100 md:hidden'
          >
            <PlusIcon className='w-6 h-6' />
          </button>
        </div>
      </div>

      <section className='grid gap-2 h-full overflow-y-auto md:grid-cols-3 md:grid-rows-2 md:gap-2 px-3'>
        {isLoadingData ? (
          <div className='w-full bg-gray-200 rounded-xl py-8' />
        ) : (
          records?.slice(0, 9).map((record) => <Record key={record.id} {...record} />)
        )}
      </section>
      <FavouritesModal
        isVisible={isFavouritesModalOpen}
        onCancel={() => setIsFavouritesModalOpen(false)}
        onConfirm={refetch}
        records={(records as BookmarkedRecord[]) || []}
      />
    </NewPage>
  )
}
