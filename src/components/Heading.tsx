interface Props {
  title: string
  subtitle: string
  className?: string
}

export default function Heading({ title, subtitle, className }: Props) {
  return (
    <section className={className}>
      <p className='text-2xl font-medium md:text-3xl'>{title}</p>
      <p className='text-gray-500 font-medium md:text-xl'>{subtitle}</p>
    </section>
  )
}
