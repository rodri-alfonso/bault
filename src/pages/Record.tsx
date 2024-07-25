import { useParams, useLocation } from 'wouter'
import useFetch from '@/hooks/useFetch'
import { deleteRecord, getRecordById } from '@/services/records'
import { decrypt } from '@/lib/encryption'

export default function RecordPage() {
	const [_, navigate] = useLocation()
	const { id } = useParams()
	const { data } = useFetch(() => getRecordById(id))

	function handleDelete() {
		deleteRecord(id).then(() => navigate('/'))
	}

	return (
		<div>
			<div className='flex items-center justify-between'>
				<button onClick={() => navigate('/')}>go back</button>
				<h1> RecordPage</h1>
			</div>

			<div>
				<h2>Record data</h2>
				<p>Email: {decrypt(data?.email ?? '')}</p>
				<p>Password: {decrypt(data?.password ?? '')}</p>
				<p>Site: {decrypt(data?.site ?? '')}</p>
				<p>User: {decrypt(data?.user ?? '')}</p>
			</div>
			<button onClick={handleDelete} className='bg-red-400 rounded-lg p-1 text-sm'>
				Delete
			</button>
		</div>
	)
}
