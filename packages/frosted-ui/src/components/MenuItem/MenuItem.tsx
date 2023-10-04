'use client';

import { DropdownMenuItemProps, Item } from '@radix-ui/react-dropdown-menu';
import type * as Radix from '@radix-ui/react-primitive';
import React, { forwardRef } from 'react';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import { Icon } from '../Icon';

export type MenuItemProps = {
  icon?: IconDefinition;
  colorScheme?: 'black' | 'error-red';
} & DropdownMenuItemProps;

export const MenuItem = forwardRef<
  React.ElementRef<typeof Item>,
  Radix.ComponentPropsWithoutRef<typeof Item> & MenuItemProps
>(
  (
    { icon, colorScheme = 'black', children, className, ...props },
    forwardedRef,
  ) => {
    return (
      <Item
        ref={forwardedRef}
        className={cn(
          'text-subtitle3 mx-1 flex items-center rounded px-2 transition',
          'cursor-pointer select-none outline-none focus:outline-none',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
          'h-8',
          {
            'focus:bg-whop-hover text-whop-black': colorScheme === 'black',
            'focus:bg-whop-tag-error-background text-whop-tag-error':
              colorScheme === 'error-red',
          },
          className,
        )}
        {...props}
      >
        {icon && <Icon icon={icon} className="mr-2 text-sm" />}
        {children}
      </Item>
    );
  },
);

MenuItem.displayName = 'MenuItem';
