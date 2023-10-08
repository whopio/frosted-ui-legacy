import type * as Radix from '@radix-ui/react-primitive';
import {
  Indicator,
  Item,
  RadioGroupItemProps,
} from '@radix-ui/react-radio-group';
import React, { forwardRef, useId } from 'react';
import { RadioColorScheme } from '.';
import { cn } from '../../lib/classnames';
import { Text } from '../Text';

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
      <div className="fui-RadioItem">
        <Item
          data-accent={colorScheme}
          ref={forwardedRef}
          className={cn('fui-RadioItem-Item', className)}
          id={defaultId}
          {...props}
        >
          <Indicator className="fui-RadioItem-Indicator" />
        </Item>
        <Text
          as="label"
          variant="body2"
          className={cn('fui-RadioItem-Label', labelClassName)}
          htmlFor={defaultId}
        >
          {label}
        </Text>
      </div>
    );
  },
);

RadioItem.displayName = 'RadioItem';
