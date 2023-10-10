import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, {
  ButtonHTMLAttributes,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
  forwardRef,
} from 'react';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import {
  ButtonType,
  ColorScheme,
  Size,
} from '../../lib/shared-component-types';
import { Icon } from '../Icon';

export type IconButtonShape = 'default' | 'circle';
export const IconButtonShapes: { [key: string]: IconButtonShape } = {
  Default: 'default',
  Circle: 'circle',
};

export type IconButtonSize = Size;
export const IconButtonSizes: { [key: string]: IconButtonSize } = {
  'Extra small': 'xs',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  'Extra large': 'xl',
};

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'elevated'
  | 'blank';
export const IconButtonVariants: { [key: string]: IconButtonVariant } = {
  Primary: 'primary',
  Secondary: 'secondary',
  Outline: 'outline',
  Elevated: 'elevated',
  Blank: 'blank',
};

type IconButtonColorScheme = Exclude<
  ColorScheme,
  'blue' | 'gray' | 'light-gray' | 'off-black' | 'gold-gradient'
>;
export const IconButtonColorSchemes: { [key: string]: IconButtonColorScheme } =
  {
    Brand: 'brand',
    Black: 'black',
    White: 'white',
    'Dark Gray': 'dark-gray',
    Purple: 'purple',
    'Success Green': 'success-green',
    'Warning Yellow': 'warning-yellow',
    'Error Red': 'error-red',
    'Discord Purple': 'discord-purple',
    'Twitter Blue': 'twitter-blue',
  };

const hasShadow = (variant: string) => variant === 'elevated';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  shape?: IconButtonShape;
  type?: ButtonType;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  colorScheme?: IconButtonColorScheme;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLButtonElement>;
  onReset?: FormEventHandler<HTMLButtonElement>;
  icon?: IconDefinition;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      shape = 'default',
      type = 'button',
      size = 'md',
      variant = 'primary',
      colorScheme = 'brand',
      icon,
      onClick,
      onSubmit,
      onReset,
      isDisabled = false,
      isLoading = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        onSubmit={onSubmit}
        onReset={onReset}
        disabled={isDisabled || isLoading}
        type={type}
        className={cn(
          'group/icon-button relative flex shrink-0 items-center justify-center overflow-hidden rounded-md transition',
          'focus-visible:border-purple-500 focus-visible:ring-purple-200  outline-none transition focus:outline-none focus-visible:border focus-visible:ring',
          'font-sans tracking-[-0.005em]',
          {
            'h-6 !w-6': size === 'xs',
            'h-8 !w-8': size === 'sm',
            'h-10 !w-10': size === 'md',
            'h-12 !w-12': size === 'lg',
            'h-14 !w-14': size === 'xl',
          },
          {
            '!cursor-not-allowed': isDisabled || isLoading,
            'opacity-40': isDisabled,
            'shadow-sm':
              hasShadow(variant as string) && colorScheme !== 'white',
            'shadow-sm shadow-white/[50%]':
              hasShadow(variant as string) && colorScheme === 'white',
          },
          {
            'rounded-full': shape === 'circle',
            'rounded-md': shape === 'default',
          },
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
            'bg-surface-background text-gray-800 biz-dark-1:text-gray-400 border-gray-300 biz-dark-1:border-gray-600 border':
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
          },
          className,
        )}
        {...props}
      >
        {/* Hover and focus state overlay */}
        <div
          className={cn('absolute inset-0 transition', {
            // White outline, White blank
            'group-hover/icon-button:bg-whop-background/[12%] group-active/icon-button:bg-whop-background/[18%]':
              colorScheme === 'white' && (variant === 'blank' || 'outline'),
            // White secondary
            'group-hover/icon-button:bg-whop-background/[18%] group-active/icon-button:bg-whop-background/[24%]':
              colorScheme === 'white' && variant === 'secondary',
            // White primary
            'group-hover/icon-button:bg-black/[16%] group-active/icon-button:bg-black/[32%]':
              variant === 'primary' && colorScheme === 'white',
            // Primary
            'group-hover/icon-button:bg-black/[12%] group-active/icon-button:bg-black/[18%]':
              variant === 'primary' &&
              colorScheme !== 'white' &&
              !isDisabled &&
              !isLoading,
            // Black secondary
            'group-hover/icon-button:bg-whop-hover-press':
              colorScheme === 'black' && variant === 'secondary',
            // Outline, blank, elevated light | default theme
            'group-hover/icon-button:bg-black/[4%] group-active/icon-button:bg-black/[8%]':
              variant !== 'primary' &&
              variant !== 'secondary' &&
              colorScheme !== 'white' &&
              !isDisabled &&
              !isLoading,
            // Outline, blank, elevated | biz-dark-1
            'biz-dark-1:group-hover/icon-button:bg-white/[8%] biz-dark-1:group-active/icon-button:bg-white/[16%]':
              variant !== 'primary' &&
              variant !== 'secondary' &&
              colorScheme !== 'white' &&
              !isDisabled &&
              !isLoading,
            // Outline, blank, elevated biz-dark-2
            'biz-dark-2:group-hover/icon-button:bg-white/[8%] biz-dark-2:group-active/icon-button:bg-white/[16%]':
              variant !== 'primary' &&
              variant !== 'secondary' &&
              colorScheme !== 'white' &&
              !isDisabled &&
              !isLoading,
          })}
        />
        <div className="flex items-center justify-center">
          {/* The loading icon is absolute positioned in the center of the box */}
          {isLoading && <Icon className="fa-spin absolute" icon={faSpinner} />}
          {/* If icon and no children are present, render them as usual if not loading, and transparent if loading */}
          {icon && (
            <Icon
              icon={icon}
              className={cn(
                { hidden: isLoading },
                // The size of icon based on the button size
                { 'text-[12px]': size === 'xs' },
                { 'text-[14px]': size === 'sm' },
                { 'text-[16px]': size === 'md' },
                { 'text-[17px]': size === 'lg' },
                { 'text-[18px]': size === 'xl' },
              )}
            />
          )}
        </div>
      </button>
    );
  },
);
