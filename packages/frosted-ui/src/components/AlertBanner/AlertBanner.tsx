import { faLightbulb, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import { ColorScheme } from '../../lib/shared-component-types';
import { Icon } from '../Icon';
import { IconButton, IconButtonProps } from '../IconButton';
import { Text } from '../Text';
import { TextButton, TextButtonProps } from '../TextButton';

export type AlertBannerVariant = 'default' | 'light-anchor';
export const AlertBannerVariants: { [key: string]: AlertBannerVariant } = {
  Default: 'default',
  'Light anchor': 'light-anchor',
};

export type AlertBannerColorScheme = Extract<
  ColorScheme,
  'gray' | 'purple' | 'success-green' | 'warning-yellow' | 'error-red'
>;
export const AlertBannerColorSchemes: {
  [key: string]: AlertBannerColorScheme;
} = {
  Gray: 'gray',
  Purple: 'purple',
  'Success Green': 'success-green',
  'Warning Yellow': 'warning-yellow',
  'Error Red': 'error-red',
};

export type AlertBannerProps = {
  title?: string;
  description?: string | ReactNode;
  showCta?: boolean;
  closeButtonProps?: IconButtonProps;
  ctaButtonProps?: TextButtonProps<ElementType>;
  icon?: IconDefinition;
  variant?: AlertBannerVariant;
  colorScheme?: AlertBannerColorScheme;
};
// TODO: default light-gray is missing
const styles: Record<
  AlertBannerVariant,
  Record<AlertBannerColorScheme, string>
> = {
  default: {
    gray: 'bg-gray-500 text-white',
    purple: 'bg-purple-500 text-white',
    'success-green': 'bg-status-success-500 text-white',
    'warning-yellow': 'bg-status-warning-500 text-white',
    'error-red': 'bg-status-error-500 text-white',
  },
  'light-anchor': {
    gray: 'bg-gray-50 border-gray-200 text-gray-600',
    purple: 'bg-purple-100 border-purple-500 text-purple-700',
    'success-green':
      'bg-status-success-100 border-status-success-500 text-status-success-700',
    'warning-yellow':
      'bg-status-warning-100 border-status-warning-500 text-status-warning-700',
    'error-red':
      'bg-status-error-100 border-status-error-500 text-status-error-700',
  },
};

export const AlertBanner = ({
  title,
  description,
  variant = 'default',
  colorScheme = 'gray',
  showCta = true,
  icon = faLightbulb,
  closeButtonProps,
  ctaButtonProps,
}: AlertBannerProps) => {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'relative flex items-start justify-between rounded-md border border-transparent py-3 pl-3.5 pr-[46px]',
        styles[variant][colorScheme],
      )}
    >
      <div className="flex items-start">
        <Icon icon={icon} className={cn('mr-2 h-[18px] w-[18px]')} />
        <div className="space-y-1">
          {title && (
            <Text as="h5" variant="h3">
              {title}
            </Text>
          )}
          {description && (
            <Text as="p" variant="body2">
              {description}
            </Text>
          )}
          {showCta && ctaButtonProps && (
            <TextButton
              {...ctaButtonProps}
              colorScheme={
                variant === 'default'
                  ? 'white'
                  : colorScheme === 'gray'
                  ? 'dark-gray'
                  : colorScheme
              }
              className={cn('min-[400px]:hidden mt-2')}
            />
          )}
        </div>
      </div>

      {showCta &&
        (ctaButtonProps ? (
          <TextButton
            {...ctaButtonProps}
            colorScheme={
              variant === 'default'
                ? 'white'
                : colorScheme === 'gray'
                ? 'dark-gray'
                : colorScheme
            }
            className={cn('max-[399px]:hidden absolute top-3 right-3.5')}
          />
        ) : (
          <IconButton
            icon={faXmark}
            size="sm"
            variant="blank"
            colorScheme={
              variant === 'default'
                ? 'white'
                : colorScheme === 'light-gray'
                ? 'dark-gray'
                : colorScheme === 'gray'
                ? 'dark-gray'
                : colorScheme
            }
            {...closeButtonProps}
            className={cn(
              'absolute right-1.5 top-1.5',
              {
                'text-status-error-700':
                  colorScheme === 'error-red' && variant === 'light-anchor',
              },
              closeButtonProps?.className,
            )}
          />
        ))}
    </div>
  );
};
