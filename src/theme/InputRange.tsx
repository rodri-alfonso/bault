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
    <div className='grid gap-1'>
      <div className='flex justify-between items-center'>
        <span>{label}</span>
        {counter && <span>{value}</span>}
      </div>
      <input type='range' min={min} max={max} value={value} onChange={(e) => setValue(Number(e.target.value))} />
    </div>
  )
}
