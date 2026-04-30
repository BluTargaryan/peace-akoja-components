'use client';

import { useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { MdOutlineDragHandle } from 'react-icons/md';

interface SortableItem {
  id: string;
  [key: string]: unknown;
}

interface SortableListProps<T extends SortableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  itemClassName?: string;
}

function SortableRow<T extends SortableItem>({
  item,
  renderItem,
  itemClassName,
}: {
  item: T;
  renderItem: (item: T) => React.ReactNode;
  itemClassName?: string;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className={twMerge(
        'flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-neutral-200 cursor-default select-none',
        itemClassName
      )}
      whileDrag={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
    >
      <button
        onPointerDown={(e) => controls.start(e)}
        className="touch-none cursor-grab active:cursor-grabbing text-neutral-400 hover:text-neutral-600 border-none bg-transparent p-0"
        aria-label="Drag to reorder"
      >
        <MdOutlineDragHandle size={16} />
      </button>
      {renderItem(item)}
    </Reorder.Item>
  );
}

export function SortableList<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
  className,
  itemClassName,
}: SortableListProps<T>) {
  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
      className={twMerge('flex flex-col gap-1.5 list-none p-0 m-0', className)}
    >
      {items.map((item) => (
        <SortableRow
          key={item.id}
          item={item}
          renderItem={renderItem}
          itemClassName={itemClassName}
        />
      ))}
    </Reorder.Group>
  );
}