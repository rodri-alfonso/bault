import Header from '../components/Header'
import Page from '../layout/Page'
import { getRecords } from '@/services/records'
import useFetch from '@/hooks/useFetch'
import { authStore } from '@/stores/auth'
import { PlusIcon, BookmarkIcon } from '@/assets/icons'
import Record from '@/components/Reacord'
import RecordsSlider from '@/components/RecordsSlider'
import { useLocation } from 'wouter'
import { useState } from 'react'
import FavouritesModal from '@/components/Modals/Favourites'
import { BookmarkedRecord } from '@/components/Modals/Favourites'

export default function HomePage() {
  const { user } = authStore()
  const { data, isLoading, refetch } = useFetch(getRecords)
  const [isFavouritesModalOpen, setIsFavouritesModalOpen] = useState(false)
  const [_, navigate] = useLocation()

  const [firstName] = (user?.name || '').split(' ')
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
        <RecordsSlider records={data?.filter((record) => record.marked) || []} />
      )}

      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium'>All records</p>
        {isLoadingData ? (
          <div />
        ) : (
          <button
            onClick={() => setIsFavouritesModalOpen(true)}
            className='p-2 rounded-lg hover:bg-gray-100 transition-all active:scale-95 bg-gray-50'
          >
            <BookmarkIcon />
          </button>
        )}
      </div>

      <section className='grid gap-2 overflow-y-auto mb-auto md:flex  md:flex-wrap md:gap-4'>
        {isLoadingData ? (
          <>
            <div className='w-full bg-gray-200 rounded-xl py-8' />
            <div className='w-full bg-gray-200 rounded-xl py-8' />
            <div className='w-full bg-gray-200 rounded-xl py-8' />
            <div className='w-full bg-gray-200 rounded-xl py-8' />
          </>
        ) : (
          <>
            <button
              className={`md:hidden border-2 border-solid border-gray-200 rounded-2xl h-16 p-1 pr-3 flex items-center gap-4 transition-all hover:bg-gray-50`}
              onClick={() => navigate('/create')}
            >
              <div className='grid place-items-center h-full w-12 rounded-2xl text-gray-200 text-lg font-semibold  bg-gray-100'>
                <PlusIcon className='w-6 h-6 text-gray-400' />
              </div>
              <p className=' text-gray-400'>Create new record</p>
            </button>
            {data?.map((record) => (
              <Record {...record} key={record.id} />
            ))}
          </>
        )}
      </section>
      <FavouritesModal
        isVisible={isFavouritesModalOpen}
        onCancel={() => setIsFavouritesModalOpen(false)}
        onConfirm={refetch}
        records={(data as BookmarkedRecord[]) || []}
      />
    </Page>
  )
}
