import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, {
  ButtonHTMLAttributes,
  ElementType,
  FormEventHandler,
  ForwardedRef,
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
import { Text } from '../Text';

export type ButtonSize = Size;
export const ButtonSizes: { [key: string]: Size } = {
  'Extra small': 'xs',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  'Extra large': 'xl',
};

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'elevated'
  | 'blank';
export const ButtonVariants: { [key: string]: ButtonVariant } = {
  Primary: 'primary',
  Secondary: 'secondary',
  Outline: 'outline',
  Elevated: 'elevated',
  Blank: 'blank',
};

export type ButtonColorScheme = Exclude<
  ColorScheme,
  'blue' | 'gray' | 'light-gray' | 'off-black'
>;
export const ButtonColorSchemes: { [key: string]: ButtonColorScheme } = {
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
  'Trading View Blue': 'tradingview-blue',
  'Telegram Blue': 'telegram-blue',
  'PayPal Blue': 'paypal-blue',
  'Stripe Purple': 'stripe-purple',
  'Gold Gradient': 'gold-gradient',
};

const hasShadow = (variant: string) => variant === 'elevated';

type AsProp<C extends ElementType> = {
  asComponent?: C;
};

type PropsOf<C extends ElementType> = C extends React.ComponentType<infer P>
  ? P
  : C extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[C]
  : Record<string, never>;

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    | 'type'
    | 'disabled'
    | 'onClick'
    | 'onSubmit'
    | 'onReset'
    | 'className'
    | 'children'
  > {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  colorScheme?: ButtonColorScheme;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLButtonElement>;
  onReset?: FormEventHandler<HTMLButtonElement>;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  /**
   * @dev Some classes from the regular className prop can be overridden
   * to ensure a consistent look and prevent unintended circumstances.
   * To bypass this behavior the overrideClassname prop can be used.
   * Use with caution.
   */
  overrideClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
}

type ButtonComponentProps<C extends ElementType> = PropsOf<C> &
  ButtonProps &
  AsProp<C>;

export const Button = forwardRef(function Button<
  C extends ElementType = 'button',
>(
  {
    type = 'button',
    // TODO: wrong "size" type. Fix that
    size = 'md',
    variant = 'primary',
    colorScheme = 'brand',
    children,
    onClick,
    onSubmit,
    onReset,
    leftIcon,
    rightIcon,
    isDisabled = false,
    isLoading = false,
    className,
    leftIconClassName,
    rightIconClassName,
    asComponent,
    overrideClassName,
    ...props
  }: ButtonComponentProps<C>,
  ref: ForwardedRef<unknown>,
) {
  const Component: ElementType = asComponent || 'button';
  return (
    <Component
      onClick={onClick}
      onSubmit={onSubmit}
      onReset={onReset}
      disabled={isDisabled || isLoading}
      type={type}
      className={cn(
        'group/button relative flex shrink-0 items-center justify-center overflow-hidden rounded-md transition w-fit',
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
          'text-white bg-gold-gradient':
            variant === 'primary' && colorScheme === 'gold-gradient',

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
        {
          'h-6 px-[7px]': size === 'xs',
          'h-8 px-[11px]': size === 'sm',
          'h-10 px-[15px]': size === 'md',
          'h-12 px-[19px]': size === 'lg',
          'h-14 px-[23px]': size === 'xl',
        },
        {
          '!cursor-not-allowed': isDisabled || isLoading,
          'opacity-40': isDisabled,
          'shadow-sm': hasShadow(variant as string) && colorScheme !== 'white',
          'shadow-sm shadow-white/[50%]':
            hasShadow(variant as string) && colorScheme === 'white',
        },
        overrideClassName,
      )}
      ref={ref}
      {...props}
    >
      {/* Hover and focus state overlay */}
      <div
        className={cn('absolute inset-0 transition', {
          // White outline, White blank
          'group-hover/button:bg-black/[12%] group-active/button:bg-black/[18%]':
            colorScheme === 'white' && (variant === 'blank' || 'outline'),
          // White secondary
          'group-hover/button:bg-black/[18%] group-active/button:bg-black/[24%]':
            colorScheme === 'white' && variant === 'secondary',
          // White primary
          'group-hover/button:bg-black/[16%] group-active/button:bg-black/[32%]':
            variant === 'primary' && colorScheme === 'white',
          // Primary
          'group-hover/button:bg-black/[13%] group-active/button:bg-black/[18%]':
            variant === 'primary' &&
            colorScheme !== 'white' &&
            !isDisabled &&
            !isLoading,
          // Black secondary
          'group-hover/button:bg-gray-200':
            colorScheme === 'black' && variant === 'secondary',
          // Outline, blank, elevated light | default theme
          'group-hover/button:bg-black/[4%] group-active/button:bg-black/[8%]':
            variant !== 'primary' &&
            variant !== 'secondary' &&
            colorScheme !== 'white' &&
            !isDisabled &&
            !isLoading,
          // Outline, blank, elevated | biz-dark-1
          'biz-dark-1:group-hover/button:bg-white/[8%] biz-dark-1:group-active/button:bg-white/[16%]':
            variant !== 'primary' &&
            variant !== 'secondary' &&
            colorScheme !== 'white' &&
            !isDisabled &&
            !isLoading,
          // Outline, blank, elevated biz-dark-2
          'biz-dark-2:group-hover/button:bg-white/[8%] biz-dark-2:group-active/button:bg-white/[16%]':
            variant !== 'primary' &&
            variant !== 'secondary' &&
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
              lg: 'button2',
              xl: 'button1',
            } as const
          )[size as ButtonSize]
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
              { 'mr-[5px] text-[12px]': size === 'xs' },
              { 'mr-[6px] text-[14px]': size === 'sm' },
              { 'mr-[7px] text-[16px]': size === 'md' },
              { 'mr-[8px] text-[17px]': size === 'lg' },
              { 'mr-[9px] text-[18px]': size === 'xl' },
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
                'ml-[7px]': !!children,
                '!text-transparent': isLoading,
              },
              // The size and spacing of a right icon based on the button size
              { 'ml-[5px] text-[10px]': size === 'xs' },
              { 'ml-[6px] text-[11px]': size === 'sm' },
              { 'ml-[7px] text-[12px]': size === 'md' },
              { 'ml-[8px] text-[13px]': size === 'lg' },
              { 'ml-[9px] text-[14px]': size === 'xl' },
              rightIconClassName,
            )}
          />
        )}
      </Text>
    </Component>
  );
}) as <C extends ElementType = 'button'>(
  p: ButtonComponentProps<C> & { ref?: ForwardedRef<unknown> },
) => React.ReactElement | null;
