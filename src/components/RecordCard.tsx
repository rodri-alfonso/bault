import { decrypt } from '@/lib/encryption'
import { deleteRecord } from '@/services/records'
import { RegisterWithId } from '@/services/records'

interface Props {
	record: RegisterWithId
	onDelete: () => void
}

export default function RecordCard({ onDelete, record }: Props) {
	function handleDelete() {
		deleteRecord(record.id).then(() => onDelete())
	}

	return (
		<div className='bg-gray-200 p-2 rounded-md mb-2'>
			<p>{decrypt(record.site)}</p>
			<p>{decrypt(record.email)}</p>
			<p>{decrypt(record.password)}</p>
			<p>{decrypt(record.user)}</p>
			<button onClick={handleDelete} className='bg-red-400 rounded-lg p-1 text-sm'>
				Delete
			</button>
		</div>
	)
}
