import React from 'react';
import { cn } from '../../lib/classnames';
import { ColorScheme, Size } from '../../lib/shared-component-types';
import { Text } from '../Text';

export type BadgeSize = Extract<Size, 'sm' | 'md'>;
export const BadgeSizes: { [key: string]: BadgeSize } = {
  Small: 'sm',
  Medium: 'md',
};

export type BadgeColorScheme = Extract<
  ColorScheme,
  | 'purple'
  | 'brand'
  | 'success-green'
  | 'warning-yellow'
  | 'error-red'
  | 'dark-gray'
  | 'black'
>;
export const BadgeColorSchemes: { [key: string]: BadgeColorScheme } = {
  Purple: 'purple',
  Brand: 'brand',
  'Success Green': 'success-green',
  'Warning Yellow': 'warning-yellow',
  'Error Red': 'error-red',
  'Dark Gray': 'dark-gray',
  Black: 'black',
};

export type BadgeVariant = 'default' | 'light' | 'light-anchor';
export const BadgeVariants: { [key: string]: BadgeVariant } = {
  Default: 'default',
  Light: 'light',
  'Light anchor': 'light-anchor',
};
export interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  className?: string;
}

export const Badge = ({
  text,
  variant = 'default',
  colorScheme = 'brand',
  size = 'md',
  className,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={cn(
        'text-white inline-flex w-auto items-center justify-center rounded-full border border-transparent',
        className,
        {
          'h-[18px] px-1.5': size === 'sm',
          'h-6 px-2': size === 'md',
        },
        {
          // Default variants
          'bg-purple-500': colorScheme === 'purple' && variant === 'default',
          'bg-primary-500': colorScheme === 'brand' && variant === 'default',
          'bg-status-success-500':
            colorScheme === 'success-green' && variant === 'default',
          'bg-status-warning-500':
            colorScheme === 'warning-yellow' && variant === 'default',
          'bg-status-error-500':
            colorScheme === 'error-red' && variant === 'default',
          'bg-gray-500': colorScheme === 'dark-gray' && variant === 'default',
          'bg-gray-950': colorScheme === 'black' && variant === 'default',

          // Light variant
          'bg-purple-100 text-purple-500':
            colorScheme === 'purple' && variant === 'light',
          'bg-primary-100 text-primary-500':
            colorScheme === 'brand' && variant === 'light',
          'bg-green-100 text-green-500':
            colorScheme === 'success-green' && variant === 'light',
          'bg-status-warning-100 text-status-warning-500':
            colorScheme === 'warning-yellow' && variant === 'light',
          'bg-status-error-100 text-status-error-500':
            colorScheme === 'error-red' && variant === 'light',
          'bg-gray-100 text-gray-500':
            colorScheme === 'dark-gray' && variant === 'light',
          'bg-gray-200 text-gray-600':
            colorScheme === 'black' && variant === 'light',

          // Light anchor variant
          'bg-purple-100 text-purple-500 border-purple-200':
            colorScheme === 'purple' && variant === 'light-anchor',
          'bg-primary-100 text-primary-500 border-primary-200':
            colorScheme === 'brand' && variant === 'light-anchor',
          'bg-green-100 text-green-500 border-green-300':
            colorScheme === 'success-green' && variant === 'light-anchor',
          'bg-status-warning-100 text-status-warning-500 border-status-warning-300':
            colorScheme === 'warning-yellow' && variant === 'light-anchor',
          'bg-status-error-100 text-status-error-500 border-status-error-200':
            colorScheme === 'error-red' && variant === 'light-anchor',
          'bg-gray-100 text-gray-500 border-gray-200':
            colorScheme === 'dark-gray' && variant === 'light-anchor',
          'bg-gray-200 text-gray-600 border-gray-300':
            colorScheme === 'black' && variant === 'light-anchor',
        },
      )}
      {...props}
    >
      <Text as="span" variant="button3">
        {text}
      </Text>
    </div>
  );
};
