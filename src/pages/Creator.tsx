import Page from '../layout/Page'
import FormCreator from '../components/FormCreator'
import Header from '@/components/Header'
import NewPage from '@/layout/NewPage'
import Heading from '@/components/Heading'

export default function CreatorPage() {
  return (
    <NewPage>
      <Header className='md:hidden' />
      <Heading className='pt-2 px-4 md:pt-6' title='Welcome,' subtitle="Let's create a new record!" />
      <FormCreator />
    </NewPage>
  )
}
