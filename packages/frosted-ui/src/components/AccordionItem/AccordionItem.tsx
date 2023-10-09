import { Item } from '@radix-ui/react-accordion';
import React from 'react';
import { cn } from '../../lib/classnames';

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn('border-gray-200 border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';
