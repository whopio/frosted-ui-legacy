'use client';

import { Group } from '@radix-ui/react-dropdown-menu';
import type * as Radix from '@radix-ui/react-primitive';
import React, { forwardRef } from 'react';
import { cn } from '../../lib/classnames';
import { MenuSeparator } from '../MenuSeparator';
import { Typography } from '../Typography';

export const MenuGroup = forwardRef<
  React.ElementRef<typeof Group>,
  Radix.ComponentPropsWithoutRef<typeof Group> & {
    label?: string;
    className?: string;
    separatorTop?: boolean;
    separatorBottom?: boolean;
  }
>(
  (
    {
      children,
      label,
      className,
      separatorTop = true,
      separatorBottom = false,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        {separatorTop && <MenuSeparator className="mb-0" />}
        <Group ref={ref} className={cn('mt-1', className)} {...props}>
          {label && (
            <Typography
              as="label"
              variant="overline4"
              className="block text-whop-dark-gray mb-1 ml-3 mt-3 uppercase"
            >
              {label}
            </Typography>
          )}
          {children}
        </Group>
        {separatorBottom && <MenuSeparator />}
      </>
    );
  },
);

MenuGroup.displayName = 'MenuGroup';
