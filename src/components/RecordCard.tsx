import { decrypt } from '@/lib/encryption'
import { RegisterWithId } from '@/services/records'
import { useLocation } from 'wouter'

interface Props {
	record: RegisterWithId
}

export default function RecordCard({ record }: Props) {
	const [_, navigate] = useLocation()

	return (
		<div className='bg-gray-200 p-2 rounded-md mb-2' onClick={() => navigate(`/record/${record.id}`)}>
			<p>{decrypt(record.site)}</p>
			<p>{decrypt(record.email)}</p>
			<p>{decrypt(record.password)}</p>
			<p>{decrypt(record.user)}</p>
		</div>
	)
}
