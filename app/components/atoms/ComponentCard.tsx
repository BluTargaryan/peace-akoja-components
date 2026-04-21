import Link from 'next/link'
import React from 'react'
import Button from './Button'
import {MdOutlineArrowForward} from 'react-icons/md'


const ComponentCard = () => {
  return (
    <Link href="/">
    <div className="flex flex-col border-2 border-text">
  
  <div className="p-5 uppercase border-b-2 border-text">
    <h3>Component Name</h3>
  </div>

  <div className='w-full h-50 flex items-center justify-center'>
    <div className='w-50 h-16 border-2 border-text'/>
  </div>

  <div className='px-6 py-10 flex flex-col gap-5 border-t-2 border-text'>
    <p className='line-clamp-6'>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
    </p>
<Button icon={<MdOutlineArrowForward className='text-xl'/>} 
text={<span>Details</span>}
className='px-10 py-6' />
  </div>
    </div>
    </Link>
  )
}

export default ComponentCard