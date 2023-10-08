'use client';

import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import React, { Fragment, ReactNode } from 'react';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import { Size } from '../../lib/shared-component-types';
import { Icon } from '../Icon';
import { Text } from '../Text';

export type HorizontalTabSize = Extract<Size, 'sm' | 'md'>;

export interface HorizontalTabItemProps {
  icon?: IconDefinition;
  children: ReactNode;
  rightElement?: ReactNode;
  label?: string;
  className?: string;
  size?: HorizontalTabSize;
}

export const HorizontalTabListItem = ({
  icon,
  rightElement,
  children,
  size = 'md',
}: HorizontalTabItemProps) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <div
          className={cn('fui-HorizontalTabListItem')}
          data-selected={selected ? true : undefined}
        >
          <button
            className={cn(
              'fui-HorizontalTabListItem-button',
              `fui-HorizontalTabListItem-button_size--${size}`,
            )}
          >
            {icon && (
              <Icon icon={icon} className="fui-HorizontalTabListItem-icon" />
            )}
            <Text
              as="span"
              variant={
                (
                  {
                    sm: 'button3',
                    md: 'button2',
                  } as const
                )[size]
              }
              className="fui-HorizontalTabListItem-label"
            >
              {children}
            </Text>

            {rightElement && (
              <div className="fui-HorizontalTabListItem-right-element">
                {rightElement}
              </div>
            )}
          </button>

          {selected && (
            <motion.div
              className={cn(
                'fui-HorizontalTabListItem-indicator',
                `fui-HorizontalTabListItem-indicator_size--${size}`,
              )}
              layoutId="activeUnderline"
              transition={{
                duration: 0.15,
              }}
            />
          )}
        </div>
      )}
    </Tab>
  );
};
