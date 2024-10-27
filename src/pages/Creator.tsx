import Page from '../layout/Page'
import FormCreator from '../components/FormCreator'
import Header from '@/components/Header'

export default function CreatorPage() {
  return (
    <Page className='grid gap-6'>
      <Header />
      <section>
        <p className='text-2xl font-medium'>Welcome,</p>
        <p className='text-gray-500 font-medium'>Let's create a new record!</p>
      </section>
      <FormCreator />
    </Page>
  )
}
