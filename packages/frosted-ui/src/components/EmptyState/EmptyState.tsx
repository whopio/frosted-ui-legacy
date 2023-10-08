import { faStar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';

export interface EmptyStateProps {
  icon?: IconDefinition;
  title?: string;
  description?: string;
  secondaryButton?: ButtonProps;
  primaryButton?: ButtonProps;
  showBorder?: boolean;
}

export const EmptyState = ({
  icon = faStar,
  title = 'Empty',
  description = 'No data to display.',
  secondaryButton,
  primaryButton,
  showBorder = true,
}: EmptyStateProps) => {
  return (
    <div
      className={cn('fui-EmptyState', {
        'fui-EmptyState--show-border': showBorder,
      })}
    >
      <div className="fui-EmptyState-layout">
        <div className="fui-EmptyState-icon-wrapper">
          <Icon icon={icon} className="fui-EmptyState-icon" />
        </div>
        <div>
          <Text as="p" variant="h3">
            {title}
          </Text>
          <Text as="p" variant="body2" className="fui-EmptyState-description">
            {description}
          </Text>
        </div>
        <div className="fui-EmptyState-buttons">
          {secondaryButton && (
            <Button
              variant="outline"
              colorScheme="black"
              {...secondaryButton}
            />
          )}
          {primaryButton && <Button {...primaryButton} />}
        </div>
      </div>
    </div>
  );
};
