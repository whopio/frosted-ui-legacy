import { Content, Portal } from '@radix-ui/react-dropdown-menu';
import type * as Radix from '@radix-ui/react-primitive';
import React, { forwardRef } from 'react';
import { cn } from '../../lib/classnames';

export const MenuContent = forwardRef<
  React.ElementRef<typeof Portal>,
  Radix.ComponentPropsWithoutRef<typeof Portal>
>(({ children, className, container, ...props }, forwardedRef) => {
  return (
    <Portal container={container}>
      <Content
        ref={forwardedRef}
        align="start"
        className={cn(
          // Z-INDEX: toast 500 -> tooltip 400 -> dropdowns 300 -> modal 200 -> drawer 100
          'border-whop-stroke-dark bg-whop-background z-[300] mt-1.5 max-h-[var(--radix-dropdown-menu-content-available-height)] w-[244px] overflow-auto rounded-md border py-1 shadow-lg focus:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </Content>
    </Portal>
  );
});

MenuContent.displayName = 'MenuContent';
