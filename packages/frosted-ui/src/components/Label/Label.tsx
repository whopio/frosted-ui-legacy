'use client';

import { LabelProps as RadixLabelProps, Root } from '@radix-ui/react-label';
import React from 'react';
import { cn } from '../../lib/classnames';
import { Text } from '../Text';
import { Tooltip, TooltipProps } from '../Tooltip';

export type LabelVariant = 'default' | 'emphasized';
export const LabelVariants: { [key: string]: LabelVariant } = {
  Default: 'default',
  Emphasized: 'emphasized',
};

export interface LabelProps extends RadixLabelProps {
  variant?: LabelVariant;
  className?: string;
  wrapperClassName?: string;
  tooltip?: TooltipProps;
}

export const Label = ({
  children,
  variant = 'default',
  className,
  wrapperClassName,
  tooltip,
  ...rest
}: LabelProps) => {
  return (
    <Text
      as="div"
      variant={variant === 'default' ? 'body2' : 'button2'}
      className={cn('fui-Label', wrapperClassName)}
    >
      <Root
        className={cn(
          'fui-Label-root',
          `fui-Label-root_variant--${variant}`,
          className,
        )}
        {...rest}
      >
        {children}
      </Root>
      {tooltip && <Tooltip {...tooltip} />}
    </Text>
  );
};
