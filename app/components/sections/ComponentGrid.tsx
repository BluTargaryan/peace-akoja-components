'use client'

import { componentList } from '../../data/componentList'
import ComponentCard from '../atoms/ComponentCard'

export default function ComponentGrid() {
  return (
    <ul className="grid grid-cols-1 gap-5 px-4 w-full md:grid-cols-2 xl:grid-cols-3">
      {componentList.map((component) => (
        <li key={component.id}>
          <ComponentCard entry={component} />
        </li>
      ))}
    </ul>
  )
}
