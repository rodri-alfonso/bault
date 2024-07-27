import { RegisterWithId } from '@/services/records'
import { useLocation, Link } from 'wouter'
import { decrypt } from '@/lib/encryption'
import { ViewIcon, CopyIcon } from '@/assets/icons'

export default function Record({ email, id, keys, password, site, user, color }: RegisterWithId) {
	const [_, navigate] = useLocation()

	return (
		<article
			className={`border-2 border-solid borde-gray-200 rounded-2xl h-16 p-1 pr-3 flex items-center justify-between active:scale-95 transition-all hover:bg-gray-50`}
			style={{}}
		>
			<button
				className='flex items-center h-full gap-6 cursor-pointer w-full'
				onClick={() => navigate(`/record/${id}`)}
			>
				<p
					style={{
						backgroundColor: color,
					}}
					className='grid place-items-center h-full w-12 rounded-2xl text-gray-800 text-lg font-semibold '
				>
					{decrypt(site)[0].toUpperCase()}
				</p>
				<div className='text-left'>
					<p className='font-semibold'>{decrypt(site)}</p>
					<p className='-mt-1 font-medium text-sm text-gray-400 truncate w-36'>{decrypt(user)}</p>
				</div>
			</button>

			<button onClick={() => {}} className='bg-gray-900 text-white rounded-full p-2 active:scale-95 transition-all'>
				<CopyIcon className='w-5 h-5' />
			</button>
		</article>
	)
}
