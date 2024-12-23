interface Props {
  count: number
  label: string
  icon: React.ReactNode
  primary?: boolean
}

export default function StatCard({ count, icon, label, primary }: Props) {
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
    <div
      className={`p-2 px-4 rounded-2xl border border-solid text-gray-800 font-medium text-sm grid bg-opacity-70 ${
        primary ? 'bg-pink-50 border-pink-100' : 'bg-blue-50 border-blue-100'
      }`}
    >
      <div className='flex items-center gap-1 text-gray-700'>
        <p className='text-lg font-medium'>{count}</p>
        <span className='rounded-full grid place-items-center'>{icon}</span>
      </div>
    </div>
  )
}
