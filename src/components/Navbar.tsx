import { PlusIcon, HomeIcon, HomeFilledIcon, NotebookIcon } from '@/assets/icons'
import { useLocation } from 'wouter'

export default function Navbar() {
	const [_, navigate] = useLocation()

	const isLocationPath = location.pathname === '/'

	return (
		<footer className='bg-gray-200 w-[95%] min-h-[55px] flex items-center relative rounded-2xl gap-4 px-4'>
			<section></section>
			<button className='flex items-center gap-1.5'>
				{isLocationPath ? <HomeFilledIcon /> : <HomeIcon />}
				{/* {isLocationPath && <span className='font-medium text-xs'>Home</span>} */}
			</button>

			<button className='flex items-center gap-1.5'>
				<NotebookIcon />
			</button>

			<button
				onClick={() => navigate('/create')}
				className='absolute -right-5 bg-gray-800 text-white rounded-2xl p-2.5 active:scale-95 transition-all'
			>
				<PlusIcon />
			</button>
		</footer>
	)
}
