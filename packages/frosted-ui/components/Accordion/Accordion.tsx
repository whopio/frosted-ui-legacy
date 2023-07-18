'use client';

import {
  AccordionContentProps,
  AccordionTriggerProps,
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import * as React from 'react';
import { cn } from '../../lib/classnames';

const PlusIcon = ({ open }: { open: boolean }) => {
  const variants = {
    open: { transform: 'rotate(90deg)' },
    closed: { transform: 'rotate(0deg)' },
  };

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 448 448"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M224 16C237.3 16 248 26.7 248 40L248 408C248 421.3 237.3 432 224 432C210.7 432 200 421.3 200 408L200 40C200 26.7 210.7 16 224 16Z"
        fill="currentColor"
        animate={open ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 0.2 }}
      />
      <path
        d="M432 224C432 237.3 421.3 248 408 248H40C26.7 248 16 237.3 16 224C16 210.7 26.7 200 40 200H408C421.3 200 432 210.7 432 224Z"
        fill="currentColor"
      />
    </svg>
  );
};

export type AccordionItem = {
  value: string;
  trigger: AccordionTriggerProps;
  content: AccordionContentProps;
};

export const Accordion = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> & { items?: AccordionItem[] }
>(({ items, children, ...props }, ref) => {
  const [open, setOpen] = React.useState<string | undefined>(items?.[0].value);
  return (
    // @ts-ignore
    <Root
      ref={ref}
      value={open}
      onValueChange={(value: string) => setOpen(value)}
      {...props}
    >
      {!items && children}
      {items &&
        items.map((item) => (
          <AccordionItem value={item.value}>
            <AccordionTrigger {...item.trigger} open={open === item.value} />
            <AccordionContent {...item.content} open={open === item.value} />
          </AccordionItem>
        ))}
    </Root>
  );
});

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn('border-whop-stroke border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger> & {
    open?: boolean;
  }
>(({ className, children, open = false, ...props }, ref) => {
  return (
    <Header className="flex">
      <Trigger
        ref={ref}
        className={cn(
          'flex flex-1 cursor-pointer items-center justify-between py-4 text-left font-medium outline-none transition-all focus:outline-none',
          className,
        )}
        {...props}
      >
        <div>{children}</div>
        <PlusIcon open={open} />
      </Trigger>
    </Header>
  );
});
AccordionTrigger.displayName = Trigger.displayName;

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> & {
    open?: boolean;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <Content
      ref={ref}
      className={cn(
        'data-[state=open]:animate-slide-from-top data-[state=closed]:animate-slide-to-top overflow-hidden text-sm',
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </Content>
  );
});
AccordionContent.displayName = Content.displayName;
