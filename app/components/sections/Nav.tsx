import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/logo.png'
import GreetingModule from '../atoms/greetingModule'

const Nav = () => {
  return (
    <nav className='absolute top-0 left-0 w-full flex justify-between items-center px-4 py-5 border-b-2 border-text'>
                <Link href="/" className='flex items-center gap-3'>
                <Image src={logo} alt="Peace Akoja Components logo" width={100} height={100}  className='h-7 w-auto' />
                <span className='w-28 text-wrap text-xs uppercase font-semibold font-funnel-display leading-tight'>Peace Akoja Components</span>
                </Link>

               <GreetingModule />
    </nav>
  )
}

export default Nav