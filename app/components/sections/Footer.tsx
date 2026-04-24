import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'

const Footer = () => {
  return (
    <footer className='w-full flex justify-between items-center px-4 py-5 border-t-2 border-text'>
         <Link href="/" className='flex items-center gap-3'>
                <Image src={logo} alt="Peace Akoja Components logo" width={100} height={100}  className='h-7 w-auto' />
                <span className='w-28 text-wrap text-xs uppercase font-semibold font-funnel-display leading-tight'>Peace Akoja Components</span>
                </Link>

                <div className='flex flex-col text-right items-end text-xs gap-0.5'>
                    <a href="https://peaceakoja-portfolio-v2.vercel.app/" target='_blank' className='text-text hover:text-accent transition-all duration-300'>Created by Peace</a>
                    <span className='text-text flex gap-1'>
                    <a href="tel:+2348134920950" className='text-text hover:text-accent transition-all duration-300'>Call me.</a> 
                    <a href="mailto:peaceakoja00@gmail.com" className='text-text hover:text-accent transition-all duration-300'>Email me.</a>                    
                    </span>
                </div>
    </footer>
  )
}

export default Footer