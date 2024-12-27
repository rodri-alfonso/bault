import { RegisterWithId } from '@/services/records'
import RecordCard from './RecordCard'
import { decrypt } from '@/lib/encryption'

interface Props {
  records: RegisterWithId[]
}

export default function RecordsSlider({ records }: Props) {
  return (
    <div className='py-2'>
      <section className='slides px-4 w-screen md:w-full'>
        {records.map((record) => {
          const parsedRecord: RegisterWithId = {
            color: record.color,
            keys: record.keys,
            email: decrypt(record.email),
            password: decrypt(record.password),
            site: decrypt(record.site),
            user: decrypt(record.user),
            marked: record.marked,
          }

          return <RecordCard record={parsedRecord} key={record.email} />
        })}
      </section>
    </div>
  )
}
