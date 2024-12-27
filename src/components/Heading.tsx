interface Props {
  title: string
  subtitle: string
  className?: string
}

export default function Heading({ title, subtitle, className }: Props) {
  return (
    <section className={`pt-4 md:pt-0${className}`}>
      <p className='text-3xl font-medium'>{title}</p>
      <p className='text-gray-500 font-medium text-xl'>{subtitle}</p>
    </section>
  )
}
