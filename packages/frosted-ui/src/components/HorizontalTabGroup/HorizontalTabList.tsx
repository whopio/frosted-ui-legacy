'use client';

import { Tab } from '@headlessui/react';
import { LayoutGroup } from 'framer-motion';
import React, { PropsWithChildren, useId } from 'react';
import { cn } from '../../lib/classnames';

export const HorizontalTabList = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  const id = useId();
  return (
    <Tab.List className={cn('fui-HorizontalTabList', className)}>
      <LayoutGroup id={id}>{children}</LayoutGroup>
    </Tab.List>
  );
};
