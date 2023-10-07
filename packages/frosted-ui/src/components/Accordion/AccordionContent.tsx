import { Content } from '@radix-ui/react-accordion';
import React from 'react';
import { cn } from '../../lib/classnames';
import { Text } from '../Text';

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> & {
    open?: boolean;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <Content
      ref={ref}
      className={cn('fui-AccordionContent', className)}
      {...props}
    >
      <Text as="div" variant="body2" className="fui-AccordionContent-inner">
        {children}
      </Text>
    </Content>
  );
});
AccordionContent.displayName = Content.displayName;
