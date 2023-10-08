'use client';

import { Tab } from '@headlessui/react';
import React, { PropsWithChildren } from 'react';
import { cn } from '../../lib/classnames';

export const PillTabList = ({
  children,
  className,
  fullWidth = false,
}: PropsWithChildren & { className?: string; fullWidth?: boolean }) => {
  return (
    <Tab.List
      className={cn(
        'fui-PillTabList',
        {
          'fui-PillTabList--full-width': fullWidth,
        },
        className,
      )}
    >
      {children}
    </Tab.List>
  );
};
