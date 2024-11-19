interface Props {
  count: number
  label: string
  icon: React.ReactNode
}

export default function StatCard({ count, icon, label }: Props) {
  return (
    // <div className='p-4 rounded-3xl shadow-lg bg-blue-50 bg-opacity-80 text-gray-800 font-medium text-sm grid gap-2'>
    //   <div className='flex items-center gap-2'>
    //     <span className='rounded-full grid place-items-center'>{icon}</span>
    //   </div>
    //   <div className='flex items-baseline gap-1 pl-1'>
    //     <p className='text-2xl font-normal'>{count}</p>
    //     <p className='text-xs text-gray-500'>{label}</p>
    //   </div>
    // </div>
    <div className='p-2 px-4 rounded-2xl bg-blue-50 bg-opacity-70 text-gray-800 font-medium text-sm grid'>
      <div className='flex items-center gap-1 text-gray-700'>
        <p className='text-xl font-normal'>{count}</p>
        <span className='rounded-full grid place-items-center'>{icon}</span>
      </div>
    </div>
  )
}
