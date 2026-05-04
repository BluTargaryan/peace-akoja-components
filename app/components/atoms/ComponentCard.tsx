'use client'

import Link from 'next/link'
import React from 'react'
import Button from './Button'
import {MdOutlineArrowForward} from 'react-icons/md'
import type { ComponentEntry } from '../../data/componentList'


const ComponentCard = ({ entry }: { entry: ComponentEntry }) => {
  return (
    <div className="flex flex-col border-2 border-text">
  
  <div className="p-5 border-b-2 border-text">
    <h3>{entry.name}</h3>
  </div>

  <div className='w-full py-20 px-2 flex flex-col items-center justify-center gap-4'>
    {entry.preview()}
  </div>

  <div className='px-6 py-10 flex flex-col gap-5 border-t-2 border-text'>
    <div className='line-clamp-6'>{entry.description}</div>
    <Link href="/[componentId]" as={`/${entry.id}`}>
<Button content={<><span>Details</span><MdOutlineArrowForward className='text-xl'/> </>} 
className='px-10 py-6' 
/>
</Link>
  </div>
    </div>
 
  )
}

export default ComponentCard