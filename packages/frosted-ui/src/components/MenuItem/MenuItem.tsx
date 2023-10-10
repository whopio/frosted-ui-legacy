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
          'text-body2 mx-1 flex items-center rounded px-2 transition',
          'cursor-pointer select-none outline-none focus:outline-none',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
          'h-8',
          {
            'hover:bg-gray-100 biz-dark-1:hover:bg-gray-800 text-whop-black':
              colorScheme === 'black',
            'focus:bg-status-error-100  biz-dark-1:bg-status-error-800 text-status-error-500':
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
