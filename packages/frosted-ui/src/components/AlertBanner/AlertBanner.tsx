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
  | 'gray'
  | 'light-gray'
  | 'purple'
  | 'success-green'
  | 'warning-yellow'
  | 'error-red'
>;
export const AlertBannerColorSchemes: {
  [key: string]: AlertBannerColorScheme;
} = {
  Gray: 'gray',
  'Light Gray': 'light-gray',
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
      data-accent={colorScheme}
      className={cn('fui-AlertBanner', {
        //  Variants
        'fui-AlertBanner_variant--default': variant === 'default',
        'fui-AlertBanner_variant--light-anchor': variant === 'light-anchor',
      })}
    >
      <div className="fui-AlertBanner-content">
        <Icon icon={icon} className="fui-AlertBanner-icon" />
        <div>
          {title && (
            <Text as="h5" variant="h3" className="fui-AlertBanner-title">
              {title}
            </Text>
          )}
          {description && (
            <Text
              as="p"
              variant="body2"
              className="fui-AlertBanner-description"
            >
              {description}
            </Text>
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
            className="fui-AlertBanner-TextButton"
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
              'fui-AlertBanner-IconButton',
              closeButtonProps?.className,
            )}
          />
        ))}
    </div>
  );
};
