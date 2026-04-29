'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Button from './Button'
import {MdOutlineArrowForward} from 'react-icons/md'
import { SpringButton } from './SpringButton'
import { Accordion } from './Accordion'
import { StaggeredList } from './StaggeredList'


const ComponentCard = ({componentId}: {componentId: string}) => {
  const [replayKey, setReplayKey] = useState(0);
  const people = [
    { name: 'Aisha Kamara',  role: 'Design lead' },
    { name: 'Tunde Okafor',  role: 'Engineering' },
    { name: 'Ngozi Mensah',  role: 'Product'     },
  ];
  return (
    <div className="flex flex-col border-2 border-text">
  
  <div className="p-5 border-b-2 border-text">
    <h3>Component Name</h3>
  </div>

  <div className='w-full py-20 flex flex-col items-center justify-center gap-4'>
    {/* <div className='w-50 h-16 border-2 border-text'/> */}
    <StaggeredList
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
    />
  </div>

  <div className='px-6 py-10 flex flex-col gap-5 border-t-2 border-text'>
    <p className='line-clamp-6'>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
    </p>
    <Link href="/[componentId]" as={`/${componentId}`}>
<Button content={<><MdOutlineArrowForward className='text-xl'/> <span>Details</span></>} 
className='px-10 py-6' 
/>
</Link>
  </div>
    </div>
 
  )
}

export default ComponentCard