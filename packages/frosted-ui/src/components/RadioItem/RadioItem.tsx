import type * as Radix from '@radix-ui/react-primitive';
import {
  Indicator,
  Item,
  RadioGroupItemProps,
} from '@radix-ui/react-radio-group';
import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/classnames';
import { RadioColorScheme } from '../RadioGroup';
import { Typography } from '../Typography';

export type RadioItemProps = {
  label?: string;
  colorScheme?: RadioColorScheme;
  labelClassName?: string;
} & RadioGroupItemProps;

export const RadioItem = forwardRef<
  React.ElementRef<typeof Item>,
  Radix.ComponentPropsWithoutRef<typeof Item> & {
    label?: string;
    colorScheme?: RadioColorScheme;
    labelClassName?: string;
  }
>(
  (
    { label, colorScheme = 'brand', className, labelClassName, ...props },
    forwardedRef,
  ) => {
    const defaultId = useId();
    return (
      <div className="flex items-center disabled:cursor-not-allowed">
        <Item
          ref={forwardedRef}
          className={cn(
            'bg-whop-background border-whop-stroke-dark cursor-pointer rounded-full border-2 outline-none disabled:cursor-not-allowed h-4 w-4',
            {
              'state-checked:bg-whop-primary state-checked:border-whop-primary':
                colorScheme === 'brand',
              'state-checked:bg-whop-black state-checked:border-whop-black':
                colorScheme === 'black',
              'state-checked:bg-whop-field-highlight state-checked:border-whop-field-highlight':
                colorScheme === 'purple',
            },
            className,
          )}
          id={defaultId}
          {...props}
        >
          <Indicator className="after:bg-whop-background relative flex h-full w-full items-center justify-center after:block after:rounded-[50%] after:content-[''] after:h-1.5 after:w-1.5" />
        </Item>
        <Typography
          as="label"
          variant="body2"
          className={cn(
            'text-whop-black ml-3 cursor-pointer disabled:cursor-not-allowed',
            labelClassName,
          )}
          htmlFor={defaultId}
        >
          {label}
        </Typography>
      </div>
    );
  },
);

RadioItem.displayName = 'RadioItem';
