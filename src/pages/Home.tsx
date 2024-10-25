import Header from '../components/Header'
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
    <main className='flex flex-col gap-4 h-screen py-6 pb-4'>
      <Header />
      <section className='pt-2 px-4'>
        <p className='text-2xl font-medium'>{`Hello ${firstName},`}</p>
        <p className='text-gray-500 font-medium'>Let's check your bault!</p>
      </section>
      {isLoadingData ? (
        <div className='bg-gray-200 rounded-3xl py-11 mt-4 max-w-[310px] mb-6 ml-4' />
      ) : (
        <RecordsSlider records={data?.filter((record) => record.marked) || []} />
      )}

      <div className='flex items-center justify-between pt-4 px-4 '>
        <p className='text-lg font-medium'>All records {data?.length && `(${data?.length})`}</p>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setIsFavouritesModalOpen(true)}
            className='p-2 rounded-xl hover:bg-gray-200 transition-all active:scale-95 bg-gray-100'
          >
            <BookmarkIcon className='' />
          </button>
          <button
            onClick={() => navigate('/create')}
            className='p-2 rounded-xl hover:bg-gray-200  transition-all active:scale-95 bg-gray-100'
          >
            <PlusIcon className='w-6 h-6' />
          </button>
        </div>
      </div>

      <section className='grid gap-2 overflow-y-auto mb-auto md:flex  md:flex-wrap md:gap-4 px-3'>
        {isLoadingData ? (
          <div className='w-full bg-gray-200 rounded-xl py-8' />
        ) : (
          data?.map((record) => <Record {...record} key={record.id} />)
        )}
      </section>
      <FavouritesModal
        isVisible={isFavouritesModalOpen}
        onCancel={() => setIsFavouritesModalOpen(false)}
        onConfirm={refetch}
        records={(data as BookmarkedRecord[]) || []}
      />
    </main>
  )
}
