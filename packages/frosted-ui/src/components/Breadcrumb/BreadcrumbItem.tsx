'use client';

import React from 'react';
import { cn } from '../../lib/classnames';
import { Button, ButtonProps } from '../Button';
import { Text } from '../Text';
export interface BreadcrumbItemProps extends ButtonProps {
  isLastItem?: boolean;
}

export const BreadcrumbItem = ({
  isLastItem,
  children,
  ...props
}: BreadcrumbItemProps) => {
  if (isLastItem) {
    return (
      <Text
        as="div"
        variant="overline1"
        className={cn(
          'fui-BreadcrumbItem fui-BreadcrumbItem--last',
          props?.className,
        )}
      >
        {children}
      </Text>
    );
  }
  return (
    <Button variant="blank" colorScheme="dark-gray" size="xs" {...props}>
      <Text
        as="span"
        variant="overline1"
        className={cn('fui-BreadcrumbItem', props?.className)}
      >
        {children}
      </Text>
    </Button>
  );
};
