interface Props {
  value: number
  setValue: (otp: number) => void
  label?: string
  min?: number
  max?: number
  counter?: boolean
}

export default function InputRange({ setValue, value, label, min = 1, max = 20, counter }: Props) {
  return (
    <div className='grid gap-1 w-full'>
      <div className='flex justify-between items-center text-sm lowercase font-medium'>
        <span className=''>{label}</span>
        {counter && <span>{value}</span>}
      </div>
      <input
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className='range'
        // className='cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-800'
      />
    </div>
  )
}
