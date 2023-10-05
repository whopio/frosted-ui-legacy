'use client';

import type * as Radix from '@radix-ui/react-primitive';
import {
  Indicator,
  Item,
  RadioGroupItemProps,
} from '@radix-ui/react-radio-group';
import React, { ReactNode, forwardRef, useId } from 'react';
import { cn } from '../../lib/classnames';
import {
  RadioCardColorScheme,
  RadioCardSize,
  RadioCardVariant,
} from '../RadioCardGroup';
import { Typography } from '../Typography';

export type RadioCardItemProps = {
  label: string | ReactNode;
  description?: string | ReactNode;
  size?: RadioCardSize;
  variant?: RadioCardVariant;
  colorScheme?: RadioCardColorScheme;
  isDisabled?: boolean;
  labelClassName?: string;
  href?: string;
} & Omit<RadioGroupItemProps, 'disabled'>;

const isReactNodeLabel = (element: string | ReactNode): element is ReactNode =>
  typeof element !== 'string';

export const RadioCardItem = forwardRef<
  React.ElementRef<typeof Item>,
  Radix.ComponentPropsWithoutRef<typeof Item> & RadioCardItemProps
>(
  (
    {
      label,
      description,
      size = 'md',
      colorScheme = 'brand',
      variant = 'radio',
      className,
      isDisabled = false,
      labelClassName,
      href,
      ...props
    },
    forwardedRef,
  ) => {
    const defaultId = useId();

    const labelComponent = (
      <label
        className={cn(
          'cursor-pointer space-y-1  text-left group-disabled:cursor-not-allowed',
          {
            'mt-[-1px]': size === 'sm' && !!description && variant === 'radio',
            'mt-[-0.75px]':
              size === 'md' && !!description && variant === 'radio',
          },
        )}
      >
        <Typography
          as="span"
          variant={
            (
              {
                sm: 'button2',
                md: 'button1',
              } as const
            )[size]
          }
          className={cn('text-whop-black block w-full', labelClassName)}
        >
          {label}
        </Typography>

        {description && (
          <Typography
            as="span"
            variant={size === 'sm' ? 'body2' : 'body1'}
            className="text-whop-dark-gray block w-full"
          >
            {description}
          </Typography>
        )}
      </label>
    );
    return href ? (
      <a
        href={href}
        onClick={(ev) => {
          ev.preventDefault();
        }}
        className="block"
      >
        <Item
          ref={forwardedRef}
          disabled={isDisabled}
          className={cn(
            'bg-whop-background border-whop-stroke-dark hover:bg-whop-hover state-checked:border-2 state-checked:shadow-md group box-border flex w-full min-w-[250px] cursor-pointer items-start rounded-md border outline-none transition disabled:cursor-not-allowed disabled:opacity-40',
            {
              'items-center': !description && !isReactNodeLabel(label),
            },
            // Unselected padding
            {
              'p-3': size === 'sm',
              'p-4': size === 'md',
            },
            // Selected padding to prevent the content jump
            {
              'state-checked:p-[11px]': size === 'sm',
              'state-checked:p-[15px]': size === 'md',
            },
            {
              'state-checked:border-whop-primary': colorScheme === 'brand',
              'state-checked:border-whop-field-highlight':
                colorScheme === 'purple',
            },
            className,
          )}
          id={defaultId}
          {...props}
        >
          {variant === 'radio' && (
            <div
              className={cn(
                'border-whop-stroke-dark mr-3 shrink-0 rounded-full border-2',
                {
                  'group-state-checked:bg-whop-primary group-state-checked:border-whop-primary':
                    colorScheme === 'brand',
                  'group-state-checked:bg-whop-field-highlight group-state-checked:border-whop-field-highlight':
                    colorScheme === 'purple',
                },
                {
                  'h-4 w-4': size === 'sm',
                  'h-[18px] w-[18px]': size === 'md',
                },
              )}
            >
              <Indicator
                className={cn(
                  "after:bg-whop-background relative flex h-full w-full items-center justify-center after:block after:rounded-[50%] after:content-['']",
                  {
                    'after:h-1.5 after:w-1.5': size === 'sm',
                    'after:h-[6.75px] after:w-[6.75px]': size === 'md',
                  },
                )}
              />
            </div>
          )}
          {labelComponent}
        </Item>
      </a>
    ) : (
      <Item
        ref={forwardedRef}
        disabled={isDisabled}
        className={cn(
          'bg-whop-background border-whop-stroke-dark hover:bg-whop-hover state-checked:border-2 state-checked:shadow-md group box-border flex w-full min-w-[250px] cursor-pointer items-start rounded-md border outline-none transition disabled:cursor-not-allowed disabled:opacity-40',
          {
            'items-center': !description && !isReactNodeLabel(label),
          },
          // Unselected padding
          {
            'p-3': size === 'sm',
            'p-4': size === 'md',
          },
          // Selected padding to prevent the content jump
          {
            'state-checked:p-[11px]': size === 'sm',
            'state-checked:p-[15px]': size === 'md',
          },
          {
            'state-checked:border-whop-primary': colorScheme === 'brand',
            'state-checked:border-whop-field-highlight':
              colorScheme === 'purple',
          },
          className,
        )}
        id={defaultId}
        {...props}
      >
        {variant === 'radio' && (
          <div
            className={cn(
              'border-whop-stroke-dark mr-3 shrink-0 rounded-full border-2',
              {
                'group-state-checked:bg-whop-primary group-state-checked:border-whop-primary':
                  colorScheme === 'brand',
                'group-state-checked:bg-whop-field-highlight group-state-checked:border-whop-field-highlight':
                  colorScheme === 'purple',
              },
              {
                'h-4 w-4': size === 'sm',
                'h-[18px] w-[18px]': size === 'md',
              },
            )}
          >
            <Indicator
              className={cn(
                "after:bg-whop-background relative flex h-full w-full items-center justify-center after:block after:rounded-[50%] after:content-['']",
                {
                  'after:h-1.5 after:w-1.5': size === 'sm',
                  'after:h-[6.75px] after:w-[6.75px]': size === 'md',
                },
              )}
            />
          </div>
        )}
        {labelComponent}
      </Item>
    );
  },
);

RadioCardItem.displayName = 'RadioCardItem';
