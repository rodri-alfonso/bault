import { RegisterWithId } from '@/services/records'
import RecordCard from './RecordCard'

interface Props {
	records: RegisterWithId[]
}

export default function RecordsSlider({ records }: Props) {
	return (
		<div className='py-2'>
			<section className='slides'>
				{records?.map((record) => (
					<RecordCard record={record} key={record.email} />
				))}
			</section>
		</div>
	)
}
