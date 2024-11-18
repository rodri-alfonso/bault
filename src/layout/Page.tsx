// export default function Page({ children, className }: { children: React.ReactNode; className?: string }) {
//   return <main className={`h-screen p-6 px-4 pb-3 ${className}`}>{children}</main>
// }
export default function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main className='grid place-items-center h-screen w-full'>
      <div className={`h-full p-6 px-4 pb-3 ${className}`}>{children}</div>
    </main>
  )
}
