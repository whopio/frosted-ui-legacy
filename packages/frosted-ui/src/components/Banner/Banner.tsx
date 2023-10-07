'use client';

import { faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useState } from 'react';
import { cn } from '../../lib/classnames';
import { IconDefinition } from '../../lib/icon-types';
import { ColorScheme } from '../../lib/shared-component-types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

export type BannerColorScheme = Extract<
  ColorScheme,
  'purple' | 'success-green' | 'warning-yellow' | 'error-red'
>;
export const BannerColorSchemes: { [key: string]: BannerColorScheme } = {
  Purple: 'purple',
  'Success Green': 'success-green',
  'Warning Yellow': 'warning-yellow',
  'Error Red': 'error-red',
};

export const Banner = ({
  showIcon = true,
  icon = faInfoCircle,
  title,
  ctaText = 'Learn more',
  colorScheme = 'purple',
  onClick,
  allowDismiss = false,
}: {
  showIcon?: boolean;
  icon?: IconDefinition;
  title: string;
  ctaText?: string;
  colorScheme?: BannerColorScheme;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  allowDismiss?: boolean;
}) => {
  const [show, setShow] = useState(true);

  const handleDismiss = useCallback(() => setShow(false), []);

  return (
    <div
      className={cn('fui-Banner', { 'fui-Banner--hidden': !show })}
      data-accent={colorScheme}
      onClick={onClick}
    >
      {showIcon && <Icon icon={icon} className="fui-Banner-icon" />}
      <Text as="p" variant="body1">
        {title}
      </Text>
      <Button
        colorScheme="black"
        variant="elevated"
        className="!bg-white !text-black"
        size="xs"
      >
        {ctaText}
      </Button>
      {allowDismiss && (
        // TODO: remove this div wrapper after IconButton is migrated from Tailwind to Vanilla CSS
        <div className="fui-Banner-dismiss-button">
          <IconButton
            colorScheme="white"
            variant="blank"
            size="xs"
            icon={faXmark}
            className="!text-white"
            onClick={handleDismiss}
          />
        </div>
      )}
    </div>
  );
};
