'use client';

import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { PillTabItemProps } from '.';
import { cn } from '../../lib/classnames';
import { Text } from '../Text';

export const PillTabListItem = ({
  badge,
  children,
  label,
  className,
  selectedClassName,
  fullWidth = false,
}: PillTabItemProps) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <div className={cn('fui-PillTabListItem', className)}>
          {selected && (
            <motion.div
              className={cn('fui-PillTabListItem-indicator', selectedClassName)}
              layoutId="active"
              transition={{
                duration: 0.15,
              }}
            />
          )}
          {badge && <div className="fui-PillTabListItem-badge" />}
          <Text
            as="span"
            variant="button2"
            className="fui-PillTabListItem-text"
          >
            {children}
          </Text>
          {label && (
            <Text
              as="div"
              variant="body2"
              className="fui-PillTabListItem-label"
            >
              {label}
            </Text>
          )}
        </div>
      )}
    </Tab>
  );
};
