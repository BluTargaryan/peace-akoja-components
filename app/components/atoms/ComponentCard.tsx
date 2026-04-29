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

  <div className='w-full py-20 flex flex-col items-center justify-center gap-4'>
    {entry.preview()}
    {/* <div className='w-50 h-16 border-2 border-text'/> */}
    {/* <StaggeredList
      key={replayKey}
      items={people}
      staggerDelay={0.08}
      duration={0.3}
      once={true}
      renderItem={(person) => (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 bg-white">
          <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-medium text-neutral-500">
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">{person.name}</p>
            <p className="text-xs text-neutral-500">{person.role}</p>
          </div>
        </div>
      )}
    />
    <Button
    className='w-50 h-16 border-2 border-text text-base'
      content={<span>Replay</span>}
      onClick={() => setReplayKey(k => k + 1)}
    /> */}
  </div>

  <div className='px-6 py-10 flex flex-col gap-5 border-t-2 border-text'>
    <p className='line-clamp-6'>{entry.description}</p>
    <Link href="/[componentId]" as={`/${entry.id}`}>
<Button content={<><MdOutlineArrowForward className='text-xl'/> <span>Details</span></>} 
className='px-10 py-6' 
/>
</Link>
  </div>
    </div>
 
  )
}

export default ComponentCard