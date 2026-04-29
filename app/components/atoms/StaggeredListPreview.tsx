'use client'

import { useState } from 'react'
import { StaggeredList } from './StaggeredList'
import Button from './Button'

const people = [
  { name: 'Aisha Kamara', role: 'Design lead' },
  { name: 'Tunde Okafor', role: 'Engineering' },
  { name: 'Ngozi Mensah', role: 'Product' },
]

export default function StaggeredListPreview() {
  const [replayKey, setReplayKey] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <StaggeredList
        key={replayKey}
        items={people}
        renderItem={(person) => (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 bg-white">
            <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-medium text-neutral-500">
              {person.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">{person.name}</p>
              <p className="text-xs text-neutral-500">{person.role}</p>
            </div>
          </div>
        )}
      />
      <Button
      className='p-4 text-base'
        content={<span>Replay</span>}
        onClick={() => setReplayKey((k) => k + 1)}
      />
    </div>
  )
}
