import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, {
  ButtonHTMLAttributes,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import {
  ButtonType,
  ColorScheme,
  Size,
} from '../../lib/shared-component-types';
import { Icon } from '../Icon';
import { Text } from '../Text';

export type ChipSize = Extract<Size, 'xs' | 'sm' | 'md'>;
export const ChipSizes: { [key: string]: ChipSize } = {
  'Extra small': 'xs',
  Small: 'sm',
  Medium: 'md',
};

export type ChipVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'elevated'
  | 'blank'
  | 'light-anchor';
export const ChipVariants: { [key: string]: ChipVariant } = {
  Primary: 'primary',
  Secondary: 'secondary',
  Outline: 'outline',
  Elevated: 'elevated',
  Blank: 'blank',
  'Light Anchor': 'light-anchor',
};

type ChipColorScheme = Exclude<
  ColorScheme,
  'blue' | 'gray' | 'off-black' | 'light-gray' | 'gold-gradient'
>;
export const ChipColorSchemes: { [key: string]: ChipColorScheme } = {
  Brand: 'brand',
  Black: 'black',
  White: 'white',
  'Dark Gray': 'dark-gray',
  Purple: 'purple',
  'Success Green': 'success-green',
  'Warning Yellow': 'warning-yellow',
  'Error Red': 'error-red',
  'Twitter Blue': 'twitter-blue',
  'Discord Purple': 'discord-purple',
};

const useShadow = (variant: ChipVariant) => variant === 'elevated';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  size?: ChipSize;
  variant?: ChipVariant;
  colorScheme?: ChipColorScheme;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLButtonElement>;
  onReset?: FormEventHandler<HTMLButtonElement>;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
}

export const Chip = ({
  type = 'button',
  size = 'md',
  variant = 'light-anchor',
  colorScheme = 'purple',
  children,
  onClick,
  onSubmit,
  onReset,
  leftIcon,
  rightIcon,
  isDisabled = false,
  isLoading = false,
  leftIconClassName,
  rightIconClassName,
  className,
  ...props
}: ChipProps) => {
  return (
    // TODO: Add errors for variant / colorScheme permutations that aren't accepted
    <button
      onClick={onClick}
      onSubmit={onSubmit}
      onReset={onReset}
      disabled={isDisabled}
      type={type}
      className={cn(
        'group relative flex shrink-0 items-center justify-center overflow-hidden rounded-full transition',
        'focus-visible:border-purple-500 focus-visible:ring-purple-200 outline-none transition focus:outline-none focus-visible:border focus-visible:ring',
        className,
        {
          // Primary variants
          'bg-primary-500 text-white':
            variant === 'primary' && colorScheme === 'brand',
          'bg-purple-500 text-white':
            variant === 'primary' && colorScheme === 'purple',
          'bg-black text-surface-background':
            variant === 'primary' && colorScheme === 'black',
          'bg-gray-800 text-white':
            variant === 'primary' && colorScheme === 'dark-gray',
          'bg-whop-brands-discord text-white':
            variant === 'primary' && colorScheme === 'discord-purple',
          'bg-whop-brands-twitter text-white':
            variant === 'primary' && colorScheme === 'twitter-blue',
          'bg-whop-brands-paypal text-white':
            variant === 'primary' && colorScheme === 'paypal-blue',
          'bg-whop-brands-telegram text-white':
            variant === 'primary' && colorScheme === 'telegram-blue',
          'bg-whop-brands-tradingview text-white':
            variant === 'primary' && colorScheme === 'tradingview-blue',
          'bg-whop-brands-stripe text-white':
            variant === 'primary' && colorScheme === 'stripe-purple',
          'bg-white text-black':
            variant === 'primary' && colorScheme === 'white',
          'bg-status-error-500 text-white':
            variant === 'primary' && colorScheme == 'error-red',
          'bg-status-warning-500 text-white':
            variant === 'primary' && colorScheme == 'warning-yellow',
          'bg-status-success-500 text-white':
            variant === 'primary' && colorScheme === 'success-green',

          // Secondary variants
          'bg-gray-100 text-black':
            variant === 'secondary' && colorScheme == 'black',
          'bg-surface-background/[12%] text-surface-background':
            variant === 'secondary' && colorScheme == 'white',

          // Stroke variants
          'bg-surface-background text-primary-500 border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'brand',
          'bg-surface-background text-purple-500 border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'purple',
          'bg-surface-background text-black border-gray-200 biz-dark-1:text-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'black',
          'bg-surface-background text-gray-800 border-gray-200 biz-dark-1:text-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'dark-gray',
          'bg-surface-background text-status-error-500 border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'error-red',
          'bg-surface-background text-status-warning-500 border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'warning-yellow',
          'bg-surface-background text-status-success-500 border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'success-green',
          'bg-surface-background text-whop-brands-twitter border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'twitter-blue',
          'bg-surface-background text-whop-brands-telegram border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'telegram-blue',
          'bg-surface-background text-whop-brands-paypal border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'paypal-blue',
          'bg-surface-background text-whop-brands-tradingview border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'tradingview-blue',
          'bg-surface-background text-whop-brands-discord border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'discord-purple',
          'bg-surface-background text-whop-brands-stripe border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'stripe-purple',
          'bg-ransparent text-surface-background border-gray-200 biz-dark-1:border-gray-700 border':
            variant === 'outline' && colorScheme == 'white',

          // Elevated variants
          'bg-surface-background text-black border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'black',
          'bg-surface-background text-gray-800 border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'dark-gray',
          'bg-surface-background text-status-error-500 border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'error-red',
          'bg-surface-background text-status-warning-500 border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'warning-yellow',
          'bg-surface-background text-status-success-500 border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'success-green',
          'bg-surface-background text-purple-500 border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'purple',
          'bg-surface-background text-primary-500 border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'brand',
          'bg-surface-background text-whop-brands-twitter border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'twitter-blue',
          'bg-surface-background text-whop-brands-paypal border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'paypal-blue',
          'bg-surface-background text-whop-brands-telegram border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'telegram-blue',
          'bg-surface-background text-whop-brands-tradingview border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'tradingview-blue',
          'bg-surface-background text-whop-brands-discord border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'discord-purple',
          'bg-surface-background text-whop-brands-stripe border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'stripe-purple',
          'bg-transparent text-surface-background border-gray-300 biz-dark-1:border-gray-600 border':
            variant === 'elevated' && colorScheme == 'white',

          // Blank variants
          'bg-transparent text-black biz-dark-1:text-white':
            variant === 'blank' && colorScheme == 'black',
          'bg-transparent text-gray-800 biz-dark-1:text-gray-200':
            variant === 'blank' && colorScheme == 'dark-gray',
          'bg-transparent text-primary-500':
            variant === 'blank' && colorScheme == 'brand',
          'bg-transparent text-purple-500':
            variant === 'blank' && colorScheme == 'purple',
          'bg-transparent text-status-success-500':
            variant === 'blank' && colorScheme == 'success-green',
          'bg-transparent text-status-error-500':
            variant === 'blank' && colorScheme == 'error-red',
          'bg-transparent text-status-warning-500':
            variant === 'blank' && colorScheme == 'warning-yellow',
          'bg-transparent text-whop-brands-twitter':
            variant === 'blank' && colorScheme == 'twitter-blue',
          'bg-transparent text-whop-brands-paypal':
            variant === 'blank' && colorScheme == 'paypal-blue',
          'bg-transparent text-whop-brands-telegram':
            variant === 'blank' && colorScheme == 'telegram-blue',
          'bg-transparent text-whop-brands-tradingview':
            variant === 'blank' && colorScheme == 'tradingview-blue',
          'bg-transparent text-whop-brands-discord':
            variant === 'blank' && colorScheme == 'discord-purple',
          'bg-transparent text-whop-brands-stripe':
            variant === 'blank' && colorScheme == 'stripe-purple',
          'bg-transparent text-surface-background':
            variant === 'blank' && colorScheme == 'white',

          // TODO: missing colors
          // Light anchor variant
          'bg-purple-100 text-purple-500 border border-purple-200':
            colorScheme === 'purple' && variant === 'light-anchor',
          'bg-primary-100 text-primary-500 border border-primary-200':
            colorScheme === 'brand' && variant === 'light-anchor',
          'bg-green-100 text-green-500 border border-green-300':
            colorScheme === 'success-green' && variant === 'light-anchor',
          'bg-status-warning-100 text-status-warning-500 border border-status-warning-300':
            colorScheme === 'warning-yellow' && variant === 'light-anchor',
          'bg-status-error-100 text-status-error-500 border border-status-error-200':
            colorScheme === 'error-red' && variant === 'light-anchor',
          'bg-gray-100 text-gray-500 border border-gray-200':
            colorScheme === 'dark-gray' && variant === 'light-anchor',
          'bg-gray-200 text-gray-600 border border-gray-300':
            colorScheme === 'black' && variant === 'light-anchor',
        },
        {
          'h-6 px-[10px]': size === 'xs',
          'h-8 px-[14px]': size === 'sm',
          'h-10 px-[18px]': size === 'md',
        },
        {
          '!cursor-not-allowed': isDisabled || isLoading,
          'opacity-40': isDisabled,
          'shadow-sm': useShadow(variant),
        },
      )}
      {...props}
    >
      {/* Hover and focus state overlay */}
      <div
        className={cn('absolute inset-0 transition', {
          // Purple light anchor
          'group-hover:bg-purple-500/[10%] group-active:bg-purple-500/[14%]':
            colorScheme === 'purple' && variant === 'light-anchor',
          // White outline, White blank
          'group-hover:bg-surface-background/[12%] group-active:bg-surface-background/[18%]':
            colorScheme === 'white' && (variant === 'blank' || 'outline'),
          // White secondary
          'group-hover:bg-surface-background/[18%] group-active:bg-surface-background/[24%]':
            colorScheme === 'white' && variant === 'secondary',
          // White primary
          'group-hover:bg-black/[16%] group-active:bg-black/[32%]':
            variant === 'primary' && colorScheme === 'white',
          // Primary
          'group-hover:bg-black/[12%] group-active:bg-black/[18%]':
            variant === 'primary' &&
            colorScheme !== 'white' &&
            !isDisabled &&
            !isLoading,
          // Light gray secondary
          'group-hover:bg-gray-100-press':
            colorScheme === 'black' && variant === 'secondary',
          // Outline, blank, elevated
          'group-hover:bg-gray-100 group-active:bg-gray-100-press':
            variant !== 'primary' &&
            variant !== 'secondary' &&
            variant !== 'light-anchor' &&
            colorScheme !== 'white' &&
            !isDisabled &&
            !isLoading,
        })}
      />

      <Text
        as="div"
        variant={
          (
            {
              xs: 'button3',
              sm: 'button3',
              md: 'button2',
            } as const
          )[size]
        }
        className="flex items-center justify-center"
      >
        {/* The loading icon is absolute positioned in the center of the box */}
        {isLoading && <Icon className="fa-spin absolute" icon={faSpinner} />}

        {/* The left icon is rendered to the left of the children with 2em of margin on the right if children are present */}
        {leftIcon && (
          <Icon
            icon={leftIcon}
            className={cn(
              {
                '!text-transparent': isLoading,
              },
              // The size and spacing of a left icon based on the button size
              { 'mr-[5px] text-[12px]': !!children && size === 'xs' },
              { 'mr-[6px] text-[14px]': !!children && size === 'sm' },
              { 'mr-[7px] text-[14px]': !!children && size === 'md' },
              leftIconClassName,
            )}
          />
        )}

        {/* If children are present, render them as usual if not loading, and transparent if loading */}
        {children && (
          <div className={cn({ '!text-transparent': isLoading })}>
            {children}
          </div>
        )}

        {/* The right icon is rendered to the right of the children with 2em of margin on the left if children are present */}
        {rightIcon && (
          <Icon
            icon={rightIcon}
            className={cn(
              {
                '!text-transparent': isLoading,
              },
              // The size and spacing of a right icon based on the button size
              { 'ml-[5px] text-[10px]': !!children && size === 'xs' },
              { 'ml-[6px] text-[12px]': !!children && size === 'sm' },
              { 'ml-[7px] text-[12px]': !!children && size === 'md' },
              rightIconClassName,
            )}
          />
        )}
      </Text>
    </button>
  );
};
