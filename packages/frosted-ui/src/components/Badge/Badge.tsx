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
      data-accent={colorScheme}
      className={cn(
        'fui-Badge',
        // Sizes
        {
          'fui-Badge_size--sm': size === 'sm',
          'fui-Badge_size--md': size === 'md',
        },
        {
          //  Variants
          'fui-Badge_variant--default': variant === 'default',
          'fui-Badge_variant--light': variant === 'light',
          'fui-Badge_variant--light-anchor': variant === 'light-anchor',
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
