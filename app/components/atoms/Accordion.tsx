'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { twMerge } from 'tailwind-merge';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface AccordionItem {
  value: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export function Accordion({
  items,
  type = 'single',
  className,
  triggerClassName,
  contentClassName,
}: AccordionProps) {
  const rootProps =
    type === 'single'
      ? { type: 'single' as const, collapsible: true }
      : { type: 'multiple' as const };

  return (
    <RadixAccordion.Root
      {...rootProps}
      className={twMerge('w-full divide-y divide-text', className)}
    >
      {items.map((item) => (
        <RadixAccordion.Item key={item.value} value={item.value}>
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              className={twMerge(
                'group flex w-full items-center justify-between py-4 text-left text-base font-medium text-text outline-none',
                triggerClassName
              )}
            >
              {item.title}
              <MdOutlineKeyboardArrowDown
                size={16}
                className="shrink-0 text-text transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180"
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>

          <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className={twMerge('pb-4 text-sm text-text leading-relaxed', contentClassName)}>
              {item.content}
            </div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}