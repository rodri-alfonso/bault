interface Props {
  count: number
  label: string
  icon: React.ReactNode
  primary?: boolean
}

export default function StatCard({ count, icon, primary }: Props) {
  return (
    <div
      className={`p-1 px-2.5 rounded-xl md:p-2 md:px-4 md:rounded-2xl border border-solid text-gray-800 font-medium text-sm grid bg-opacity-70 ${
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
