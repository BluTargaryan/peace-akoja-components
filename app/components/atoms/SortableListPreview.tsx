'use client';

import { useState } from 'react';
import { SortableList } from './SortableList';

const initial = [
  { id: '1', name: 'Aisha Kamara',  role: 'Design lead' },
  { id: '2', name: 'Tunde Okafor',  role: 'Engineering' },
  { id: '3', name: 'Ngozi Mensah',  role: 'Product'     },
  { id: '4', name: 'Jonas Becker',  role: 'Marketing'   },
];

export default function SortableListPreview() {
  const [items, setItems] = useState(initial);

  return (
    <SortableList
      className='w-50'
      items={items}
      onReorder={setItems}
      renderItem={(item) => (
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-900">{item.name}</p>
          <p className="text-xs text-neutral-500">{item.role}</p>
        </div>
      )}
    />
  );
}