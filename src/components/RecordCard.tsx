import { decrypt } from '@/lib/encryption'
import { RegisterWithId } from '@/services/records'
import { useLocation } from 'wouter'
import { CopyIcon } from '@/assets/icons'
import Typography from '@/theme/Typography'

interface Props {
	record: RegisterWithId
}

export default function RecordCard({ record }: Props) {
	const [_, navigate] = useLocation()

	function handleCopy() {
		const password = decrypt(record.password)
		navigator.clipboard.writeText(password)
	}

	return (
		<article
			style={{
				backgroundColor: record.color || 'whitesmoke',
			}}
			className='rounded-3xl p-8 flex items-center justify-between shadow-lg max-w-[380px] min-w-[310px]'
			// onClick={() => navigate(`/record/${record.id}`)}
		>
			<div className='flex items-center gap-4'>
				<div className='grid place-items-center w-10 h-10 bg-gray-900 rounded-full text-white'>
					<Typography text={decrypt(record.site)[0].toUpperCase()} className='text-lg font-semibold' />
				</div>

				<div className='grid w-10'>
					<p className='font-semibold'>{decrypt(record.site)}</p>
					<p className='text-sm text-gray-700 -mt-1 truncate w-32 '>{decrypt(record.user)}</p>
				</div>
			</div>

			<button
				onClick={handleCopy}
				className='bg-white p-3 shadow-sm rounded-xl text-gray-800 active:scale-95 transition-all '
			>
				<CopyIcon />
			</button>
		</article>
	)
}
