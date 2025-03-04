import { Logo2 } from '@/assets/logo'
import Button from '@/theme/Button'
import { useLocation } from 'wouter'

export default function Splash() {
  const [_, navigate] = useLocation()

  const TWENTY_WORDS_RELATED_TO_SECURE = [
    'safe',
    'protected',
    'guarded',
    'shielded',
    'secure',
    'locked',
    'fortified',
    'defended',
    'safeguarded',
    'preserved',
    'watched',
    'sheltered',
    'covered',
    'secured',
    'armored',
    'immune',
    'bulletproof',
    'unassailable',
    'impregnable',
    'invulnerable',
  ]

  const Mazonry = () => {
    return (
      // <div className='grid grid-cols-3 xl:grid-cols-3 gap-4 px-4 py-4'>
      //   {TWENTY_WORDS_RELATED_TO_SECURE.slice(0, 3).map((word, index) => {
      //     // Patrón basado en la estructura deseada
      //     const isColSpan2 = index % 2 === 0
      //     const bgColor = isColSpan2 ? 'bg-blue-900' : 'bg-blue-600'
      //     // const GET_RANCOM_NUMBER_BETWEEN_TRHREE = Math.floor(Math.random() * 3) + 1

      //     return index % 2 === 0 ? (
      //       <div key={word} className={`w-full h-24 ${bgColor} rounded-xl ${isColSpan2 ? 'col-span-2' : ''}`}></div>
      //     ) : (
      //       <>
      //         <div key={word} className={`w-full h-24 ${bgColor} rounded-xl ${isColSpan2 ? 'col-span-2' : ''}`}></div>
      //         <div key={word} className={`w-full h-24 ${bgColor} rounded-xl ${isColSpan2 ? 'col-span-2' : ''}`}></div>
      //       </>
      //     )
      //   })}
      // </div>
      <div className='grid grid-cols-3 xl:grid-cols-3 gap-4 py-4'>
        <div className='w-full h-72  rounded-xl bg-[url("/waves.svg")] bg-white'></div>
        <div className='w-full h-72  rounded-xl bg-[url("/waves.svg")] bg-white col-span-2'></div>
        <div className='w-full h-72  rounded-xl bg-[url("/waves.svg")] bg-white col-span-2'></div>
        <div className='w-full h-72  rounded-xl bg-[url("/waves.svg")] bg-white'></div>
        <div className='w-full h-72  rounded-xl bg-[url("/waves.svg")] bg-white'></div>
        <div className='w-full h-72  rounded-xl bg-[url("/waves.svg")] bg-white col-span-2'></div>
      </div>
    )
  }

  return (
    // <main className='h-screen w-full relative bg-gray-200'>
    //   <header className='flex items-center  top-2 w-full bg-gray-200'>
    //     <p>header</p>
    //   </header>

    //   <section className='bg-gray-200 absolute h-2/4 w-full rounded-b-[70px] grid place-items-center gap-6 pb-10 pt-10 z-50'>
    //     <picture className='grid place-items-center relative p-1'>
    //       {/* <img
    //         src='https://imgs.search.brave.com/7oJEsc8gRax0Gr6n8HbLWIg-UARAj3ItANLxDfmRoBI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMud2JtLmltL3B3/L3NtYWxsL2EyZjlk/NjM5ZDVkMGM1NTg0/NTZlMGM1OWI2NmEy/NmIxLmpwZw'
    //         alt=''
    //         className='rounded-full border-2 border-solid border-white w-20 h-20 object-cover'
    //       /> */}

    //       <div className='rounded-[30px] border-2 border-solid border-white w-24 h-24 object-cover grid place-items-center bg-white bg-opacity-40'>
    //         <Logo2 className='w-full h-full p-3' />
    //       </div>
    //       {/* <span className='absolute top-8 -right-14 rounded-full bg-white border border-solid border-gray-200 px-2'>
    //         Hi fred!
    //       </span> */}
    //     </picture>
    //     <div className='grid gap-1 text-center text-5xl'>
    //       <h1 className='font-semibold'>Welcome to Vault,</h1>
    //       <h2 className='font-medium text-gray-400'>your new password keeper</h2>
    //       <p className='text-lg pt-4 text-gray-400'>All your passwords saved and secure in one place.</p>
    //     </div>
    //     <Button label="Let's started!" className='p-3 !rounded-2xl' />p section
    //   </section>

    //   <div className='absolute top-32 h-1/2 rounded-b-[70px] w-full bg-[url("/waves.svg")] bg-white'>
    //     <p>citureee</p>
    //   </div>

    //   <div className='h-screen bg-blue-300' />
    //   <section className='h-screen md:bg-[url("/waves.svg")] relative '>
    //     <div className='absolute h-1/3 w-full bottom-0 bg-purple-200 rounded-t-[70px] bg-opacity-70 grid place-items-center'>
    //       <p>footer!!</p>
    //     </div>
    //   </section>

    //   <footer></footer>
    // </main>
    <main className='w-full relative  bg-gray-900 p-4'>
      {/* <header className='flex items-center  top-2 w-full bg-gray-200'>
        <p>header</p>
      </header> */}

      <section className='flex items-center gap-10 flex-col h-full w-full py-20 pb-30 bg-white bg-[url("/waves.svg")] rounded-[20px]'>
        <Logo2 className='text-gray-800' />
        <div className='grid gap-1 text-center text-6xl'>
          <h1 className='font-semibold transition-all hover:scale-105'>Welcome to Vault,</h1>
          <h2 className='font-semibold text-gray-400 transition-all hover:scale-105'>your new password keeper.</h2>
          <p className='text-lg pt-6 text-gray-600'>All your passwords saved and secure in one place.</p>
        </div>
        <Button label='Get my vault!' className='p-3 !rounded-2xl mb-auto' onClick={() => navigate('login')} />
      </section>
      <Mazonry />

      {/* <div className='w-full bg-gray-900 h-screen '> */}
      {/* <p>lalalal</p> */}
      {/* <div className='py-20' /> */}
      {/* <section className='flex sh-1/2 flex-wrap gap-5 '> */}
      {/* {TWENTY_WORDS_RELATED_TO_SECURE.map((word, index) => (
            <span
              key={index}
              className='bg-gray-200 rounded-[20px] grid place-items-center px-3 py-0.5 font-medium text-gray-800'
            >
              {word}
            </span>
          ))} */}

      {/* </section> */}
      {/* </div> */}

      <footer className='w-full py-10 bg-white bg-[url("/waves.svg")] rounded-[20px]'>
        <div></div>
      </footer>
    </main>
  )
}
