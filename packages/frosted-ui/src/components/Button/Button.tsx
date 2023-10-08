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
      data-accent={colorScheme}
      // TODO: check if this doesn't collide with Radix UI props
      data-loading={isLoading ? true : undefined}
      className={cn(
        'fui-Button',
        `fui-Button_variant--${variant}`,
        `fui-Button_size--${size}`,
        className,
        overrideClassName,
      )}
      ref={ref}
      {...props}
    >
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
        className="fui-Button-content"
      >
        {leftIcon && (
          <Icon
            icon={leftIcon}
            className={cn('fui-Button-icon-left', leftIconClassName)}
          />
        )}
        {children}
        {rightIcon && (
          <Icon
            icon={rightIcon}
            className={cn('fui-Button-icon-right', rightIconClassName)}
          />
        )}
      </Text>
      {isLoading && (
        <Icon className="fa-spin fui-Button-spinner" icon={faSpinner} />
      )}
    </Component>
  );
}) as <C extends ElementType = 'button'>(
  p: ButtonComponentProps<C> & { ref?: ForwardedRef<unknown> },
) => React.ReactElement | null;
